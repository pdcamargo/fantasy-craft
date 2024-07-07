import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('max_hp')
      table.dropColumn('max_cp')

      table.integer('movement_speed').notNullable().defaultTo(30)
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.integer('max_hp').notNullable().defaultTo(0)
      table.integer('max_cp').notNullable().defaultTo(0)

      table.dropColumn('movement_speed')
    })
  }
}
