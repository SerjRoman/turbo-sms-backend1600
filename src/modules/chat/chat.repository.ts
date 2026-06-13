import { ChatRepositoryContract } from "./types/chat.contracts";
import { PrismaClient } from "../../prisma/client";
import {
	Chat,
	ChatWithParticipantInfo,
	ChatWithUsertInfo,
	CreateChat,
} from "./types/chat.types";

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
	getChatsWithParticipantInfo: function (
		ownerId: number,
	): Promise<ChatWithUsertInfo[]> {
		return PrismaClient.chat.findMany({
			where: {
				participants: {
					some: {
						userId: ownerId,
					},
				},
			},
			include: {
				lastMessage: true,
				participants: {
					where: {
						NOT: {
							userId: ownerId,
						},
					},
					include: {
						user: {
							select: {
								id: true,
								name: true,
								surname: true,
								avatar: true,
								contactsOf: {
									where: {
										contactOwnerId: ownerId,
									},
									select: {
										id: true,
										localName: true,
										avatar: true,
									},
								},
							},
						},
					},
				},
			},
		});
	},
	getChatByParticipants: function (
		userId1: number,
		userId2: number,
	): Promise<Chat | null> {
		return PrismaClient.chat.findFirst({
			where: {
				AND: [
					{
						participants: {
							some: {
								userId: userId1,
							},
						},
					},
					{
						participants: {
							some: {
								userId: userId2,
							},
						},
					},
				],
			},
		});
	},
	create: function (data: CreateChat): Promise<Chat> {
		return PrismaClient.chat.create({
			data: {
				participants: {
					createMany: {
						data: [
							{ userId: data.ownerId },
							{ userId: data.contactUserId },
						],
					},
				},
			},
		});
	},
	getChatWithParticipantInfo: function (
		chatId: number,
	): Promise<ChatWithParticipantInfo | null> {
		return PrismaClient.chat.findUnique({
			where: {
				id: chatId,
			},
			include: {
				lastMessage: true,
				participants: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								surname: true,
								avatar: true,
							},
						},
					},
				},
			},
		});
	},
};
