import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('current_hp').notNullable().defaultTo(0)
      table.integer('max_hp').notNullable().defaultTo(0)
      table.integer('temporary_hp').notNullable().defaultTo(0)

      table.integer('current_cp').notNullable().defaultTo(0)
      table.integer('max_cp').notNullable().defaultTo(0)
      table.integer('temporary_cp').notNullable().defaultTo(0)

      table
        .jsonb('abilities')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            Strength: {
              value: 10,
              customBonus: 0,
            },
            Dexterity: {
              value: 10,
              customBonus: 0,
            },
            Constitution: {
              value: 10,
              customBonus: 0,
            },
            Intelligence: {
              value: 10,
              customBonus: 0,
            },
            Wisdom: {
              value: 10,
              customBonus: 0,
            },
            Charisma: {
              value: 10,
              customBonus: 0,
            },
          })
        )
        .alter()
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('current_hp')
      table.dropColumn('max_hp')
      table.dropColumn('temporary_hp')

      table.dropColumn('current_cp')
      table.dropColumn('max_cp')
      table.dropColumn('temporary_cp')
    })
  }
}
