import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("editorial").notNullable()
      table.string("formato", 255).notNullable()
      table.integer("no_paginas").notNullable()
      table.integer("id_usuario").unsigned().notNullable()
      table.string("titulo", 255).notNullable()
      table.integer("author").unsigned().notNullable()

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
