import { Request, Response } from 'express'
import db from '../database/connection'

export default class ProfileController {
  async index(request: Request, response: Response) {
    const ong_id = request.headers.authorization

    const incidents = await db('incidents')
      .where("ong_id","=", ong_id as string)
      .select("*")

    return response.json(incidents)
  }
}