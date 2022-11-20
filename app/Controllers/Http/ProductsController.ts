// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
  async getProducts({ auth, response }) {
    response.json({ products: [] })
  }
}
