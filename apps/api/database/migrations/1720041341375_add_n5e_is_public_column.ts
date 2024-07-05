import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('is_public').notNullable().defaultTo(true)
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_public')
    })
  }
}
