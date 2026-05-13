import { NotFoundError } from "../../errors/app.errors";
import { ChatRepository } from "./chat.repository";
import { ChatServiceContract } from "./types/chat.contracts";

export const ChatService: ChatServiceContract = {
	async isUserInChat(userId, chatId) {
		const chatParticipant = await ChatRepository.getChatParticipant(
			userId,
			chatId,
		);
		return !!chatParticipant;
	},
	async getChatWithParticipants(chatId) {
		const chat = await ChatRepository.getChatWithParticipants(chatId);
		if (!chat) throw new NotFoundError("Chat");
		return chat;
	},
};
