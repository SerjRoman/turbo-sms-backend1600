import { ChatService } from "./chat.service";
import { ChatControllerContract } from "./types/chat.contracts";

export const ChatController: ChatControllerContract = {
	async create(req, res, next) {
		try {
			const ownerId = +res.locals.userId;
			const contactUserId = req.body.contactUserId;
			const chat = await ChatService.create({ ownerId, contactUserId });
			res.json(chat);
		} catch (error) {
			next(error);
		}
	},
	async getMyChats(req, res, next) {
		try {
			const ownerId = +res.locals.userId;
			const chats = await ChatService.getMyChats(ownerId);
			res.json(chats);
		} catch (error) {
			next(error);
		}
	},
};
