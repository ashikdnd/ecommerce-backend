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

  async login({ request, auth, response }) {
    const params = request.all()
    console.log(params)
    try {
      const email = request.input('email')
      const password = request.input('password')

      const user = await auth.use('api').attempt(email, password)
      response.json({ success: true, user: user })
    } catch (e) {
      console.log(e)
      response.status(401)
      response.json({ success: false })
    }
  }

  async getUsers({ auth, response }) {
    await auth.use('api').authenticate()
    response.json({ user: auth.user })
    //response.json({ users: [] })
  }

  async logout({ auth, response }) {
    await auth.use('api').authenticate()
    await auth.use('api').revoke()
    response.json({ success: true })
  }
}
