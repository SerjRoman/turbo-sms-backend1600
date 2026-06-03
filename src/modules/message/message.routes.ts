import { Router } from "express";
import { MessageController } from "./message.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../../middlewares/upload.middleware";

export const MessageRoutes = Router();

MessageRoutes.get(
	"/chat/:chatId",
	authenticateMiddleware,
	MessageController.getAllMessagesByChat,
);
MessageRoutes.post(
	"/media",
	authenticateMiddleware,
	uploadMiddleware.single("media"),
	processImageMiddleware(true, 600, 80),
	MessageController.uploadMessageMedia,
);
