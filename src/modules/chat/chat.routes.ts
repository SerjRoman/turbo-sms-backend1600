import { Router } from "express";
import { ChatController } from "./chat.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import { validateMiddleware } from "../../middlewares/validate.middleware";
import { createChatSchema } from "./chat.schema";

export const ChatRouter = Router();

ChatRouter.get("/my", authenticateMiddleware, ChatController.getMyChats);
ChatRouter.post(
	"/",
	authenticateMiddleware,
	validateMiddleware(createChatSchema),
	ChatController.create,
);
