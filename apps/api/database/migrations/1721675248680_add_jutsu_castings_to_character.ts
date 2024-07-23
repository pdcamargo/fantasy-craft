import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .jsonb('jutsu_casting')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            ninjutsu: {
              ability: 'Intelligence',
              customBonus: 0,
            },
            genjutsu: {
              ability: 'Charisma',
              customBonus: 0,
            },
            taijutsu: {
              ability: 'Strength',
              customBonus: 0,
            },
            bukijutsu: {
              ability: 'Dexterity',
              customBonus: 0,
            },
          })
        )
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('jutsu_casting')
    })
  }
}
