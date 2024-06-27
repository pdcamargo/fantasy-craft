import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().minLength(0).optional(),
    theme: vine.string().trim().optional(),
    content: vine.object({
      version: vine.string().trim(),
      time: vine.number(),
      blocks: vine.array(
        vine.object({
          type: vine.string().trim(),
          data: vine.any(),
        })
      ),
    }),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().minLength(0).optional(),
    author: vine.string().trim().optional(),
    theme: vine.string().trim().optional(),
    content: vine.object({
      version: vine.string().trim(),
      time: vine.number(),
      blocks: vine.array(
        vine.object({
          type: vine.string().trim(),
          data: vine.record(vine.any()),
        })
      ),
    }),
  })
)

export const checkSlugValidator = vine.compile(
  vine.object({
    slug: vine.string().trim(),
  })
)
