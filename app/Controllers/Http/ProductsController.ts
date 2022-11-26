// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from 'App/Models/Product'
import ProductMeta from 'App/Models/ProductMeta'

export default class ProductsController {
  async saveProduct({ auth, request, response }) {
    const body = request.body()
    const features = body.features
    delete body.features

    try {
      const product = await Product.create(body)
      console.log(product.id)
      const ft: any[] = []
      features.forEach((v) => {
        ft.push({ product_id: product.id, feature_id: v })
      })
      console.log(ft)
      await ProductMeta.createMany(ft)
      response.json({ success: true })
    } catch (e) {
      response.json({
        success: false,
        error: e,
      })
    }
  }
}
