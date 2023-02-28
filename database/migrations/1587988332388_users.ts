import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.string("nombres",255).notNullable()
      table.string("apellidos", 255).notNullable()
      table.integer("perfil_id").unsigned().references('id').inTable('perfils')
      table.string("direccion", 255).notNullable()
      table.string("barrio", 255).notNullable()
      table.integer("municipio").notNullable()
      table.integer("departamento").notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
