import type { HttpContext } from '@adonisjs/core/http'

import N5eCharacter from '#models/n5e-character'
import { createCharacterValidator, updateCharacterValidator } from '#validators/n5e'

export default class N5EController {
  async listAllCharacters({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const characters = await N5eCharacter.query().where('userId', user.id)

    return response.ok({
      data: characters,
    })
  }

  async findCharacter({ response, auth, request }: HttpContext) {
    const { user } = auth

    const id = request.param('id')
    let character = await N5eCharacter.query().where('public_id', id).first()

    if (!character) {
      return response.notFound({
        message: 'Character not found',
        data: null,
      })
    }

    if (!character.isPublic) {
      if (!user || user.id !== character.userId) {
        return response.unauthorized({
          message: 'You are not authorized to view this character',
        })
      }
    }

    return response.ok({
      data: character,
    })
  }

  async createCharacter({ response, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const data = await request.validateUsing(createCharacterValidator)

    const publicId = crypto.randomUUID()

    const character = await N5eCharacter.create({
      ...data,
      userId: user.id,
      publicId,
    })

    return response.created({
      data: {
        ...character.serialize(),
        id: publicId,
      },
    })
  }

  async updateCharacter({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const id = request.param('id')
    const { classes, skills, ...data } = await request.validateUsing(updateCharacterValidator)

    const character = await N5eCharacter.query()
      .where('public_id', id)
      .where('user_id', user.id)
      .first()

    if (!character) {
      return response.notFound({
        message: 'Character not found',
      })
    }

    const newVal = {
      ...data,
      classes: JSON.stringify(classes ?? []) as any,
      classMod: JSON.stringify(data.classMod ?? {}) as any,
      skills: JSON.stringify(skills ?? []) as any,
      jutsus: JSON.stringify(data.jutsus ?? []) as any,
      feats: JSON.stringify(data.feats ?? []) as any,
      jutsuCasting: JSON.stringify(data.jutsuCasting ?? {}) as any,
      armorClass: JSON.stringify(data.armorClass ?? {}) as any,
      proficiencies: JSON.stringify(data.proficiencies ?? {}) as any,
      bulk: JSON.stringify(data.bulk ?? {}) as any,
      info: JSON.stringify(data.info ?? {}) as any,
    }

    if (!classes) {
      delete newVal.classes
    }

    if (!skills) {
      delete newVal.skills
    }

    if (!data.jutsus) {
      delete newVal.jutsus
    }

    if (!data.feats) {
      delete newVal.feats
    }

    if (!data.classMod) {
      delete newVal.classMod
    }

    if (!data.jutsuCasting) {
      delete newVal.jutsuCasting
    }

    if (!data.armorClass) {
      delete newVal.armorClass
    }

    if (!data.proficiencies) {
      delete newVal.proficiencies
    }

    if (!data.bulk) {
      delete newVal.bulk
    }

    if (!data.info) {
      delete newVal.info
    }

    character.merge(newVal)

    await character.save()

    return response.ok({
      message: 'Character updated',
    })
  }
}
