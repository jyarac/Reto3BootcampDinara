import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column()public titulo: string
  @column()public formato: string
  @column()public no_paginas: number
  @column()public id_usuario: number
  @column()public editorial: number
  @column()public author: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
