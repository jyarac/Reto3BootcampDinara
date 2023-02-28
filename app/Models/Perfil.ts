import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } 
from '@ioc:Adonis/Lucid/Orm'
import User from 'App/models/user'
export default class Perfil extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() descripcion_perfil: string
  @hasMany(() => User)
  public usuarios:HasMany<typeof User> 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
