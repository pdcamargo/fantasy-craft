import Book from '#models/book'
import { checkSlugValidator, createBookValidator, updateBookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'

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
}
