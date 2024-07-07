import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import User from './user.js'

export default class N5eCharacter extends BaseModel {
  static table = 'n5e_characters'

  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({
    serializeAs: 'id',
  })
  declare publicId: string

  @column()
  declare isPublic: boolean

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare classes: Array<{
    name: string
    level: number
    subclass?: string
    chakraDie: number
    hitDie: number
  }>

  @column()
  declare classMod: { name: string; level: number } | null

  @column()
  declare clan: string

  @column()
  declare background: string

  @column()
  declare alignment: string

  @column()
  declare level: number

  @column()
  declare experience: number

  @column()
  declare ryo: number

  @column()
  declare feats: string[]

  @column()
  declare jutsus: string[]

  @column()
  declare abilities: Record<string, { value: number; customBonus?: number }>

  @column()
  declare skills: Array<{
    name: string
    isProficient: boolean
    customBonus?: number
    customAbility?: string
  }>

  @column()
  declare savingThrows: Record<
    string,
    {
      isProficient: boolean
      customBonus?: number
      customAbility?: string
    }
  >

  @column()
  declare elementalAffinities: string[]

  @column()
  declare info: {
    age: number
    height: string
    weight: string
    size: string
    gender: string
    eyes: string
    hair: string
    skin: string
    background: string
    avatar: string
    village: string
    rank: string
    isAnbu: boolean
    isNukenin: boolean
    titles: string[]
  }

  @column()
  declare resistances: string[]

  @column()
  declare immunities: string[]

  @column()
  declare currentHp: number

  @column()
  declare temporaryHp: number

  @column()
  declare currentCp: number

  @column()
  declare temporaryCp: number

  @column()
  declare movementSpeed: number

  @column()
  declare customData: Record<string, any>

  @column()
  declare customTabs: Record<string, string>

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
