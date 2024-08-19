import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'worlds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('public_id').notNullable().unique()
      table.string('slug').notNullable()
      table.string('name').notNullable()
      table.text('description').nullable().defaultTo(null)
      table.specificType('tags', 'text[]').notNullable().defaultTo('{}')
      table.boolean('is_public').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
