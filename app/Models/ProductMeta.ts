import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductMeta extends BaseModel {
  public static table = 'product_meta'

  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number | null

  @column()
  public featureId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
