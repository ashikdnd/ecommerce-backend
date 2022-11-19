// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  async signUp({ request, response }) {
    const params = request.all()
    const hashedPassword = await Hash.make(params.password)
    const payload = {
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      password: hashedPassword,
    }
    const user = await Database.insertQuery().table('users').insert(payload)
    const userInfo = await Database.from('users').where('id', user).select('*')
    response.json({
      success: true,
      userInfo: userInfo,
    })
  }

  async login({ request, response }) {
    const params = request.all()
    password = params.password

    // check if email exists in the table
    // if yes, fetch the record
    // compare user provided pass with table password
  }
}
