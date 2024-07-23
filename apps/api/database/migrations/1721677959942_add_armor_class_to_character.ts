import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .jsonb('armor_class')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            ability: 'Dexterity',
            armorBonus: 0,
            shieldBonus: 0,
            customBonus: 0,
          })
        )
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('armor_class')
    })
  }
}
