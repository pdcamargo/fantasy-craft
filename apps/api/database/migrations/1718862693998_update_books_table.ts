import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    // update books table
    this.schema.table(this.tableName, (table) => {
      table.string('slug').notNullable().unique()
    })
  }

  async down() {
    // drop slug column
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('slug')
    })
  }
}
