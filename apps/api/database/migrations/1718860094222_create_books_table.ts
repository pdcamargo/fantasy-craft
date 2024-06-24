import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('author').notNullable()
      table.boolean('is_published').notNullable().defaultTo(false)

      table.json('content').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
