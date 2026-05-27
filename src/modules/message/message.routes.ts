import { Router } from "express";
import { MessageController } from "./message.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";

export const MessageRoutes = Router();

MessageRoutes.get(
	"/chat/:chatId",
	authenticateMiddleware,
	MessageController.getAllMessagesByChat,
);
