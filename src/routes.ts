import { Router } from 'express'
import IncidentController from './controller/IncidentController'
import OngController from './controller/OngController'
import ProfileController from './controller/ProfileController'
import SessionController from './controller/SessionController'

const routes = Router()
const ongController = new OngController()
const incidentController = new IncidentController()
const profileController = new ProfileController()
const sessionController = new SessionController

routes.post("/sessions", sessionController.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get("/profile", profileController.index)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)

export default routes
