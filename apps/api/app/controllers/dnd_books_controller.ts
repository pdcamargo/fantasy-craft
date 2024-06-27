import Book from '#models/book'
import { checkSlugValidator, createBookValidator, updateBookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'
import { getBrowser } from './browse.js'

// @ts-expect-error
import { blocksToHTML, blocksHTMLToPageHTML } from '@craft/editorjs/handler'

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function createSlugOrIncrement(title: string, userId: number) {
  const slug = createSlug(title)
  const existingBook = await Book.query().where('slug', slug).where('user_id', userId).first()

  if (!existingBook) {
    return slug
  }

  const slugParts = slug.split('-')
  const lastPart = slugParts[slugParts.length - 1]
  const lastPartMatch = lastPart.match(/(\d+)$/)

  if (lastPartMatch) {
    const number = Number.parseInt(lastPartMatch[1])
    slugParts[slugParts.length - 1] = `${number + 1}`
  } else {
    slugParts.push('1')
  }

  const newSlug = slugParts.join('-')

  return createSlugOrIncrement(newSlug, userId)
}

export default class DndBooksController {
  async find({ response, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const id = request.param('id')
    let book = await Book.query()
      // check for both slug and public_id
      .where((query) => {
        query.where('slug', id).orWhere('public_id', id)
      })
      .where('user_id', user.id)
      .first()

    if (!book) {
      return response.notFound({
        message: 'Book not found',
      })
    }

    return response.ok({
      message: 'Book found',
      data: book,
    })
  }

  async publicFind({ response, request }: HttpContext) {
    const id = request.param('id')

    let book = await Book.query()
      // check for both slug and public_id
      .where((query) => {
        query.where('slug', id).orWhere('public_id', id)
      })
      // TODO: make sure this book is public
      .first()

    if (!book) {
      return response.notFound({
        message: 'Book not found',
      })
    }

    return response.ok({
      data: book,
    })
  }

  async listAll({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    // all books where user_id is the same as the user's id
    const books = await Book.query().where('user_id', user.id).exec()

    return response.ok({
      message: 'List of all books',
      data: books,
    })
  }

  async create({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const data = await request.validateUsing(createBookValidator)

    const slug = await createSlugOrIncrement(data.title ?? 'My New Book', user.id)

    const book = await Book.create({
      ...data,
      description: data.description ?? '',
      theme: data.theme ?? 'default',
      slug,
      userId: user.id,
      author: user.fullName ?? user.username,
    })

    return response.created({
      message: 'Book created',
      data: book,
    })
  }

  async isSlugAvailable({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { slug } = await checkSlugValidator.validate(request.params())

    const book = await Book.query().where('slug', slug).where('user_id', user.id).first()

    return response.ok({
      message: 'Slug availability checked',
      data: {
        available: !book,
      },
    })
  }

  async update({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const id = request.param('id')
    const data = await request.validateUsing(updateBookValidator)

    const book = await Book.query().where('public_id', id).where('user_id', user.id).first()

    if (!book) {
      return response.notFound({
        message: 'Book not found',
      })
    }

    book.merge(data)

    await book.save()

    return response.ok({
      message: 'Book updated',
      data: book,
    })
  }

  async delete({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const id = request.param('id')

    const book = await Book.query().where('public_id', id).where('user_id', user.id).first()

    if (!book) {
      return response.notFound({
        message: 'Book not found',
      })
    }

    await book.delete()

    return response.ok({
      message: 'Book deleted',
    })
  }

  async pdf(ctx: HttpContext) {
    const { request, response, route } = ctx

    const id = request.param('id')

    let book = await Book.query().where('public_id', id).first()

    if (!book) {
      return response.notFound({
        message: 'Book not found',
      })
    }

    let baseOrigin = ctx.request.headers().origin ?? ''

    if (!baseOrigin) {
      baseOrigin = 'http://localhost:3333'
    }

    if (!baseOrigin.startsWith('http://') && !baseOrigin.startsWith('https://')) {
      baseOrigin =
        baseOrigin.includes('localhost') || baseOrigin.includes('127.0.1')
          ? 'http://' + baseOrigin
          : 'https://' + baseOrigin
    }

    const origin = new URL(baseOrigin).origin

    const browser = await getBrowser()
    const page = await browser.newPage()

    const groups = blocksToHTML(book.content.blocks)
    const html = blocksHTMLToPageHTML(groups, '40px').replace(new RegExp('/api', 'g'), origin)

    await page.setContent(
      `
      <html>
        <head>
          <title>${book.title}</title>
          <link rel="stylesheet" href="/css/page.css">

          <style>
            body,
            html {
              margin: 0;
              padding: 0;
            }

            * {
              box-sizing: border-box;
            }

            .xanathar .page {
              --background-color: #f3f2ee;
              --background-image: url(${origin}/images/background/xanathar.jpeg);
              --background-image-odd: url(${origin}/images/background/xanathar-odd.jpeg);
              --header-text-color: #58180d;
              --header-underline-color: #c0ad6a;
              --first-letter-deg: -45deg;
              --first-letter-colors: #000, #111, #000;
              background-size: cover;
              background-repeat: no-repeat;
            }

            .page {
              --a4-width: 210mm;
              --a4-height: 297mm;
              --page-width: var(--a4-width);
              --page-height: var(--a4-height);
              --background-color: #eee5ce;
              --background-image: url(${origin}/images/background/default.jpg);
              --background-image-odd: var(--background-image);
              --font-size: 0.34cm;
              --column-count: 2;
              --column-fill: auto;
              --column-gap: 0.9cm;
              --page-padding: 1.4cm 1.9cm 1.7cm;
              --page-font-family: 'Bookinsanity';
              --header-font-family: 'Mr Eaves Small Caps';
              --header-font-h5: 'Scaly Sans Caps';
              --first-letter-font-family: 'Solbera Imitation';
              --header-text-color: #58180d;
              --header-underline-color: #c0ad6a;
              --first-letter-deg: -45deg;
              --first-letter-colors: #322814, #998250, #322814;
              --first-letter-background-image: linear-gradient(
                var(--first-letter-deg),
                var(--first-letter-colors)
              );
              width: var(--page-width);
              height: var(--page-height);
              box-sizing: border-box;
              overflow: hidden;
              position: relative;
              contain: size;
              padding: var(--page-padding);
              background-color: var(--background-color);
              background-image: var(--background-image);
              columns: 2;
              column-fill: auto;
              font-size: var(--font-size);
              font-family: var(--page-font-family);
              text-rendering: optimizeLegibility;
              counter-increment: page-numbers;
            }
            .page.letter {
              --page-width: 8.5in;
              --page-height: 11in;
            }
            .page.legal {
              --page-width: 8.5in;
              --page-height: 14in;
            }
            .page.tabloid {
              --page-width: 11in;
              --page-height: 17in;
            }
            .page.ledger {
              --page-width: 17in;
              --page-height: 11in;
            }
            .page.a0 {
              --page-width: 33.1in;
              --page-height: 46.8in;
            }
            .page.a1 {
              --page-width: 23.4in;
              --page-height: 33.1in;
            }
            .page.a2 {
              --page-width: 16.54in;
              --page-height: 23.4in;
            }
            .page.a3 {
              --page-width: 11.7in;
              --page-height: 16.54in;
            }
            .page.a4 {
              --page-width: 8.27in;
              --page-height: 11.7in;
            }
            .page.a5 {
              --page-width: 5.83in;
              --page-height: 8.27in;
              --column-count: 1;
            }
            .page.a6 {
              --page-width: 4.13in;
              --page-height: 5.83in;
              --column-count: 1;
            }
            .page:nth-child(odd) {
              background-image: var(--background-image-odd);
            }
            .page:has(.--front-cover) {
              columns: 1;
              text-align: center;
            }
            .page em {
              font-style: italic;
            }
            .page strong {
              font-weight: bold;
            }
            .page p + * {
              margin-top: 0.325cm;
            }
            .page p + p,
            .page ul + p,
            .page ol + p {
              text-indent: 1em;
            }
            .page p + p {
              margin-top: 0;
            }
            .page p {
              line-height: 1.25em;
              display: block;
              overflow-wrap: break-word;
            }
            .page blockquote,
            .page .quote {
              break-inside: avoid;
              display: inline-block;
              width: 100%;
              font-style: italic;
              line-height: 0.54cm;
            }
            .page blockquote.left,
            .page .quote.left {
              text-align: left;
            }
            .page blockquote.right,
            .page .quote.right {
              text-align: right;
            }
            .page blockquote.center,
            .page .quote.center {
              text-align: center;
            }
            .page blockquote .attribution,
            .page .quote .attribution {
              margin-top: 0;
              display: block;
              font-style: normal;
              line-height: 0.54cm;
              text-align: right;
              text-indent: initial;
            }
            .page h1 + p::first-letter {
              float: left;
              padding-bottom: 2px;
              padding-left: 40px;
              margin-top: -0.3cm;
              margin-bottom: -20px;
              margin-left: -40px;
              font-family: var(--first-letter-font-family);
              font-size: 3cm;
              line-height: 1em;
              color: rgba(0, 0, 0, 0);
              background-image: var(--first-letter-background-image);
              -webkit-background-clip: text;
              background-clip: text;
            }
            .page h1,
            .page h2,
            .page h3,
            .page h4 {
              font-family: var(--header-font-family);
              color: var(--header-text-color);
            }
            .page h1,
            .page h2,
            .page h3,
            .page h4,
            .page h5,
            .page h6 {
              font-weight: bold;
            }
            .page h1 {
              margin-bottom: 0.18cm;
              column-span: all;
              font-size: 0.89cm;
              line-height: 1em;
              -webkit-column-span: all;
              -moz-column-span: all;
            }
            .page h2 {
              font-size: 0.75cm;
              line-height: 0.988em;
            }
            .page h3 {
              font-size: 0.575cm;
              line-height: 0.995em;
              border-bottom: 2px solid var(--header-underline-color);
            }
            .page * + h3 {
              margin-top: 0.155cm;
            }
            .page h4 {
              font-size: 0.458cm;
              line-height: 0.971em;
            }
            .page * + h4 {
              margin-top: 0.235cm;
            }
            .page h5 {
              font-family: var(--header-font-h5);
              font-size: 0.423cm;
              line-height: 0.951em;
            }
            .page p + dl {
              margin-top: 0.17cm;
            }
            .page dl {
              line-height: 1.25em;
            }
            .page p + * {
              margin-top: 0.325cm;
            }
            .page dl {
              padding-left: 1em;
              white-space: pre-line;
              display: block;
            }
            .page dt {
              display: inline;
              margin-right: 5px;
              margin-left: -1em;
            }
            .page dd {
              display: inline;
              margin-left: 0;
              text-indent: 0;
            }
            .page .water-color-wrapper {
              --mask-width: 100%;
              --mask-height: 100%;
              --mask-position: 0 0;
              --image-position: 0 0;
            }
            .page .water-color-wrapper .water-color-container {
              position: absolute;
              pointer-events: none;
            }
            .page .water-color-wrapper .water-color-container .water-color-mask {
              mask-image: var(--water-color-image);
              mask-size: var(--mask-width) var(--mask-height);
              mask-position: var(--mask-position);
            }
            .page .water-color-wrapper .water-color-container .water-color-mask img {
              width: var(--mask-width);
              height: var(--mask-height);
              object-fit: cover;
              object-position: var(--image-position);
            }
            .page .water-color-wrapper.edge.top {
              --mask-height: 500px;
              padding-bottom: calc(var(--mask-height) * 0.85);
            }
            .page .water-color-wrapper.edge.top .water-color-container {
              top: 0;
              left: 0;
              right: 0;
            }
            .page .water-color-wrapper.edge.bottom {
              --mask-height: 500px;
            }
            .page .water-color-wrapper.edge.bottom .water-color-container {
              bottom: 0;
              left: 0;
              right: 0;
            }
            .page .water-color-wrapper.edge.left {
              --mask-width: 250px;
              --mask-height: var(--page-height);
            }
            .page .water-color-wrapper.edge.left .water-color-container {
              top: 0;
              left: 0;
              bottom: 0;
            }
            .page .water-color-wrapper.edge.right {
              --mask-width: 250px;
              --mask-height: var(--page-height);
            }
            .page .water-color-wrapper.edge.right .water-color-container {
              top: 0;
              right: 0;
              bottom: 0;
            }
            /* | SPELL | | | */
            .page .dnd-spell {
              margin-bottom: 0.235cm;
            }
            .page .dnd-spell-type {
              font-style: italic;
            }
            .page .dnd-spell-attributes {
              display: flex;
              flex-direction: column;
              gap: 0;
              align-items: flex-start;
              justify-content: flex-start;
              margin-top: 0.17cm;
            }
            .page .dnd-spell-attributes-attr {
              line-height: 1.25em;
              text-indent: -1.3em;
              /* Pull the first line back */
              padding-left: 1.3em;
              /* Offset the negative indent */
            }
            .page .dnd-spell-description {
              display: block;
              line-height: 1.25em;
              margin: 0;
              padding: 0;
              margin-top: 0.17cm;
              white-space: pre-line;
              font-family: var(--page-font-family);
            }

          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `,
      {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
      }
    )

    const pdf = await page.pdf({ format: 'A4', printBackground: true })

    response.header('Content-Type', 'application/pdf')

    return response.send(pdf)
  }
}
