 import {Router} from 'express'
 import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
 import { validateMiddleware } from '../../middlewares/validate.middleware';
import { ContactController } from './contact.controller';
import { createContactSchema } from './contact.schema';


 export const contactRoutes = Router()

 contactRoutes.get('/getContacts', validateMiddleware, ContactController.getAll)
contactRoutes.get('/getContact/:userId', validateMiddleware, ContactController.getContactById)
 contactRoutes.post('/createContact', validateMiddleware(createContactSchema), ContactController.createContact)