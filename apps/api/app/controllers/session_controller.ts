import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class SessionController {
  async login({ request }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(username, password)

    const token = await User.accessTokens.create(user)

    return {
      message: 'Logged in',
      data: {
        user,
        token,
      },
    }
  }

  async register({ request, response }: HttpContext) {
    const { email, password, username, fullName } = await request.validateUsing(registerValidator)

    // email and username uniqueness check
    const userExists = await User.query()
      .where('email', email)
      .orWhere('username', username)
      .first()

    if (userExists) {
      return response.badRequest({
        message: 'Validation failed',
        errors: {
          email: userExists.email === email ? 'Email already exists' : null,
          username: userExists.username === username ? 'Username already exists' : null,
        },
      })
    }

    const user = await User.create({
      email,
      password,
      username,
      fullName,
    })

    const token = await User.accessTokens.create(user)

    return response.created({
      message: 'User created',
      data: {
        user,
        token,
      },
    })
  }

  async logout({ auth }: HttpContext) {
    const user = await auth.authenticate()

    if (!user || !user.currentAccessToken) {
      return { message: 'Logged out' }
    }

    const allTokens = await User.accessTokens.all(user)

    const promises = allTokens.map((token) => User.accessTokens.delete(user, token.identifier))

    await Promise.all(promises)

    return { message: 'Logged out' }
  }

  async me({ auth }: HttpContext) {
    return {
      data: await auth.authenticate(),
    }
  }
}
