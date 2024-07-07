import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('chakra_die')
      table.dropColumn('hit_die')
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.integer('chakra_die').notNullable().defaultTo(0)
      table.integer('hit_die').notNullable().defaultTo(0)
    })
  }
}
