// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  async signUp({ request, response }) {
    const params = request.all()
    const hashedPassword = await Hash.make(params.password)

    params.password = hashedPassword
    try {
      const user = await Database.insertQuery().table('users').insert(params)
      const userInfo = await Database.from('users').where('id', user).select('*')
      response.json({
        success: true,
        userInfo: userInfo,
      })
    } catch (e) {
      console.log(e)
      const payload = {
        err_code: e.sqlState,
        err_msg: e.sqlMessage,
      }
      await Database.insertQuery().table('system_logs').insert(payload)
      response.json({
        success: false,
        error: e.sqlMessage,
      })
    }
  }
}
