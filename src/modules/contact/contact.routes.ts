<<<<<<< HEAD
import { Router } from "express";
import { ContactController } from "./contact.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import { processImageMiddleware, uploadMiddleware } from "../../middlewares/upload.middleware";

export const ContactRouter = Router();

ContactRouter.get("/", authenticateMiddleware, ContactController.getAll);
ContactRouter.get("/:id", authenticateMiddleware, ContactController.getContactById);

ContactRouter.post(
    "/",
    authenticateMiddleware,
    uploadMiddleware.single("avatar"),
    processImageMiddleware(false, 300),
    ContactController.create,
);
=======
// import {Router} from 'express'
// import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
// import { validateMiddleware } from '../../middlewares/validate.middleware';
// import {ContactController} from "./contract.controller"
// import{createContactSchema} from "./contract.schema"


// export const contactRoutes = Router()

// contactRouter.get('/getContacts', validateMiddleware, UserController.findAll)
// contactRouter.get('/getContact/:userId', validateMiddleware, UserController.findOne)
// contactRouter.post('/createContact', validateMiddleware(createContactSchema), UserController.create)
>>>>>>> master
