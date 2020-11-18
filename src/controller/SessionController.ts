import { Request, Response } from 'express'
import db from '../database/connection'

export default class SessionController {
  async create(request: Request, response: Response){
    const { id } = request.body

    const ong = await db("ongs")
      .where('id', "=", id)
      .select("name")
      .first()

    if (!ong) {
      return response.status(400).json({ error: "No Ong found With this ID"})
    }

    return response.json(ong)
  }
}