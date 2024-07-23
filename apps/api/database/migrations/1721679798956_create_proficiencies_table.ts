import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .jsonb('proficiencies')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            weapons: [],
            armor: [],
            tools: [],
            kits: [],
          })
        )
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('proficiencies')
    })
  }
}
