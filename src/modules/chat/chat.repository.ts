import { ChatRepositoryContract } from "./types/chat.contracts";
import { PrismaClient } from "../../prisma/client";

export const ChatRepository: ChatRepositoryContract = {
	getChatParticipant: function (userId: number, chatId: number) {
		return PrismaClient.chatParticipant.findUnique({
			where: { chatId_userId: { userId, chatId } },
		});
	},
	getChatWithParticipants: function (chatId: number) {
		return PrismaClient.chat.findUnique({
			where: {
				id: chatId,
			},
			include: {
				participants: true,
			},
		});
	},
};
