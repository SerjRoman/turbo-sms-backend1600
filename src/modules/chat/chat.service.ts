import { ConflictError, NotFoundError } from "../../errors/app.errors";
import { ContactRepository } from "../contact/contact.repository";
import { ChatRepository } from "./chat.repository";
import { ChatServiceContract } from "./types/chat.contracts";
import {
	ChatWithParticipantInfo,
	CreateChatDto,
	Chat,
} from "./types/chat.types";

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
	getMyChats: function (ownerId: number): Promise<ChatWithParticipantInfo[]> {
		return ChatRepository.getChatsWithParticipantInfo(ownerId);
	},
	create: async function (dto: CreateChatDto): Promise<Chat> {
		const contact = await ContactRepository.findByUsers(
			dto.ownerId,
			dto.contactUserId,
		);
		if (!contact) {
			throw new NotFoundError("Contact between users");
		}
		const chatByParticipants = await ChatRepository.getChatByParticipants(
			dto.ownerId,
			dto.contactUserId,
		);
		if (chatByParticipants) {
			throw new ConflictError("Chat between these users already exists");
		}
		return await ChatRepository.create({
			...dto,
		});
	},
	getMyChat: function (
		chatId: number,
		ownerId: number,
	): Promise<ChatWithParticipantInfo | null> {
		return ChatRepository.getChatWithParticipantInfo(chatId, ownerId);
	},
};
