import vine from '@vinejs/vine'

export const createWorldValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim().minLength(0).optional(),
  })
)
