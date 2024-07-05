import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .jsonb('saving_throws')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            Strength: {
              isProficient: false,
              customBonus: 0,
              customAbility: undefined,
            },
            Dexterity: {
              isProficient: false,
              customBonus: 0,
              customAbility: undefined,
            },
            Constitution: {
              isProficient: false,
              customBonus: 0,
              customAbility: undefined,
            },
            Intelligence: {
              isProficient: false,
              customBonus: 0,
              customAbility: undefined,
            },
            Wisdom: {
              isProficient: false,
              customBonus: 0,
              customAbility: undefined,
            },
            Charisma: {
              isProficient: false,
              customBonus: 0,
              customAbility: undefined,
            },
          })
        )
        .alter()
    })
  }

  async down() {}
}
