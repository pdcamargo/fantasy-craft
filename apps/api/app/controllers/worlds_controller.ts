import World from '#models/world'
import { createWorldValidator } from '#validators/world'
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid'

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function createSlugOrIncrement(name: string, userId: number) {
  const slug = createSlug(name)
  const existingBook = await World.query().where('slug', slug).where('user_id', userId).first()

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

export default class WorldsController {
  async find({ response, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = request.param('id')

    const book = await World.query()
      // check for both slug and public_id
      .where((query) => {
        query.where('slug', id).orWhere('public_id', id)
      })
      .where('user_id', user.id)
      .first()

    if (!book) {
      return response.notFound({
        message: 'World not found',
      })
    }

    return response.ok({
      data: book,
    })
  }

  async publicFind({ response, request }: HttpContext) {
    const slug = request.param('slug')

    const book = await World.query().where('slug', slug).where('is_public', true).first()

    if (!book) {
      return response.notFound({
        message: 'World not found',
      })
    }

    return response.ok({
      data: book,
    })
  }

  async create({ response, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const data = await request.validateUsing(createWorldValidator)

    const slug = await createSlugOrIncrement(data.name, user.id)

    const publicId = v4()

    const world = await World.create({
      ...data,
      userId: user.id,
      publicId,
      slug,
    })

    return response.created({
      data: {
        ...world,
        id: publicId,
      },
    })
  }
}
