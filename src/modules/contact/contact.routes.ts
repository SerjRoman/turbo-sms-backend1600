import { Router } from 'express'
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { ContactController } from "./contact.controller"
import { createContactSchema } from "./contact.schema"


export const contactRoutes = Router()

contactRoutes.get('/', authenticateMiddleware, ContactController.getAll)
contactRoutes.get('/:id', authenticateMiddleware, ContactController.getContactById)
contactRoutes.post('/', authenticateMiddleware, validateMiddleware(createContactSchema), ContactController.createContact)