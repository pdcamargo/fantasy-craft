import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.dropUnique(['slug'])
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.unique(['slug'])
    })
  }
}
