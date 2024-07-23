import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .jsonb('bulk')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            customBonus: 0,
            customMultiplier: 1,
          })
        )
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('bulk')
    })
  }
}
