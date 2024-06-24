import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'

import User from '#models/user'

export default class Book extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({
    serializeAs: 'id',
  })
  declare publicId: string

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare description: string

  @column()
  declare author: string

  @column()
  declare isPublished: boolean

  @column()
  declare userId: number

  @column()
  declare content: {
    version: string
    time: number
    blocks: {
      type: string
      data: {
        text: string
      }
    }[]
  }

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
