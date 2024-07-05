import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'n5e_characters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.string('name').notNullable().defaultTo('')
      table.jsonb('classes').notNullable().defaultTo('[]')
      table.jsonb('class_mod').nullable().defaultTo(null)
      table.string('clan').notNullable().defaultTo('')
      table.string('background').notNullable().defaultTo('')
      table.string('alignment').notNullable().defaultTo('')
      table.integer('level').notNullable().defaultTo(1)
      table.integer('experience').notNullable().defaultTo(0)
      table.integer('chakra_die').notNullable().defaultTo(8)
      table.integer('hit_die').notNullable().defaultTo(8)
      table.integer('ryo').notNullable().defaultTo(0)
      table.jsonb('feats').notNullable().defaultTo('[]')
      table.jsonb('jutsus').notNullable().defaultTo('[]')
      table.jsonb('abilities').notNullable().defaultTo('[]')
      table.jsonb('skills').notNullable().defaultTo('[]')
      table.jsonb('saving_throws').notNullable().defaultTo('[]')
      table.specificType('elemental_affinities', 'text[]').notNullable().defaultTo('{}')
      table
        .jsonb('info')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            age: '',
            height: '',
            weight: '',
            size: '',
            gender: '',
            eyes: '',
            hair: '',
            skin: '',
            background: '',
            avatar: '',
            village: '',
            rank: 'Genin',
            isAnbu: false,
            isNukenin: false,
            titles: [],
          })
        )
      table.specificType('resistances', 'text[]').notNullable().defaultTo('{}')
      table.specificType('immunities', 'text[]').notNullable().defaultTo('{}')
      table.jsonb('custom_data').notNullable().defaultTo('{}')
      table.json('custom_tabs').notNullable().defaultTo('{}')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
