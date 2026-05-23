import { Router } from "express";
import { ContactController } from "./contact.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../../middlewares/upload.middleware";
import { createContactSchema } from "./contact.schema";
import { validateMiddleware } from "../../middlewares/validate.middleware";

export const ContactRouter = Router();
ContactRouter.use(authenticateMiddleware);
ContactRouter.get("/", ContactController.getAll);
ContactRouter.get("/:id", ContactController.getContactById);

ContactRouter.post(
	"/",
	uploadMiddleware.single("avatar"),
	validateMiddleware(createContactSchema),
	processImageMiddleware(false, 300),
	ContactController.create,
);
