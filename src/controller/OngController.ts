import {Request, Response} from 'express'
import crypto  from 'crypto'
import db from '../database/connection'

export default class OngController {

  async index(request: Request, response: Response){
    const ongs = await db('ongs').select('*')
    return response.json(ongs)
  }

 async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf
    } = request.body
    const id = crypto.randomBytes(4).toString('hex')
  
    await db('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
  
    return response.json({ id })
  } 
}