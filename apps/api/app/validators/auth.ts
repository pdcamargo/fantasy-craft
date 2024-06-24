import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().minLength(6),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
    username: vine.string().trim().minLength(4),
    fullName: vine.string().trim().minLength(4),
  })
)
