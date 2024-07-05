import { BaseSchema } from '@adonisjs/lucid/schema'

const randomV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('public_id').notNullable().unique().defaultTo(randomV4())
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('public_id')
    })
  }
}
