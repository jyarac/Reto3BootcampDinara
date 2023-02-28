import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfils extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.string("descripcion_perfil").notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
