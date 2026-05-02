import { Router } from "express";
import { ContactController } from "./contact.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../../middlewares/upload.middleware";

export const ContactRouter = Router();
ContactRouter.use(authenticateMiddleware);
ContactRouter.get("/", ContactController.getAll);
ContactRouter.get("/:id", ContactController.getContactById);

ContactRouter.post(
	"/",
	uploadMiddleware.single("avatar"),
	processImageMiddleware(false, 300),
	ContactController.create,
);
