import { Request, Response } from 'express'
import db from '../database/connection'

export default class IncidentController {
  async index(request: Request, response: Response){
    const { page = 1 } = request.query

    const [count] = await db('incidents').count("*")
    console.log(count)

    const TotalIncidents = await db('incidents')
    .join('ongs', "ongs.id", "=", "incidents.ong_id") 
    .limit(5)
    .offset((Number(page) - 1) * 5)
    .select([
       "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ])

    response.header('X-Total-Count', count['count(*)'] as string )

    return response.json(TotalIncidents)
  }

  async create(request: Request, response: Response) {
    const { title, description } = request.body;
    const ong_id = request.headers.authorization

    const [id] = await db('incidents').insert({
      title,
      description,
      ong_id
    })

    return response.send({id})
  }

  async delete(request: Request, response: Response){
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incident = await db('incidents')
      .where('id', "=", id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id ) {
      return response.status(401).json({ error: "Not permited" })
    }
    
    await db("incidents").where("id", "=", id).delete()
    return response.status(204).send()
  }
}