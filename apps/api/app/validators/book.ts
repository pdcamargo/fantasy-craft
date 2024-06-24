import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().minLength(0).optional(),
    content: vine.object({
      version: vine.string().trim(),
      time: vine.number(),
      blocks: vine.array(
        vine.object({
          type: vine.string().trim(),
          data: vine.object({
            text: vine.string().trim(),
          }),
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
    content: vine.object({
      version: vine.string().trim(),
      time: vine.number(),
      blocks: vine.array(
        vine.object({
          type: vine.string().trim(),
          data: vine.object({
            text: vine.string().trim(),
          }),
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
