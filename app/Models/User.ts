import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Book from './book'
export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public nombres: string
  @column() public apellidos: string
  @column() public direccion: string
  @column() public barrio:string
  @column() public municipio:number
  @column() public departamento:number
  @column() public email: string

  @column() public perfil_id: number

  @hasMany(() =>Book)
  public books: HasMany<typeof Book>

  @column({ serializeAs: null })
  public password: string

  @column() public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
