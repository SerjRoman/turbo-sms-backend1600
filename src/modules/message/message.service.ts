import { BadRequestError } from "../../errors/app.errors";
import { ChatService } from "../chat/chat.service";
import { MessageRepository } from "./message.repository";
import { type MessageServiceContract } from "./types/message.contracts";

export const MessageService: MessageServiceContract = {
	async getAllMessagesByChat(chatId, pagination) {
		const messages = await MessageRepository.getAllMessagesByChat(
			chatId,
			pagination,
		);
		return messages;
	},
	async sendMessage(dto) {
		if (await ChatService.isUserInChat(dto.senderId, dto.chatId)) {
			throw new BadRequestError(
				"You are not allowed to send messages not in your chat",
			);
		}
		const message = await MessageRepository.createMessage({
			...dto,
			lastChatId: dto.chatId,
		});
		return message;
	},
};
