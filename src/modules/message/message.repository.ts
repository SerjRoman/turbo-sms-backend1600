import { PrismaClient } from "../../prisma/client";
import type { MessageRepositoryContract } from "./types/message.contracts";
import { MessageCreate, Message } from "./types/message.types";

export const MessageRepository: MessageRepositoryContract = {
	async getAllMessagesByChat(chatId, pagination) {
		const page = pagination.page ? pagination.page - 1 : 0;
		const take = pagination.take || 15;
		const count = await PrismaClient.message.count({
			where: {
				chatId,
			},
		});
		return {
			data: await PrismaClient.message.findMany({
				skip: page * take,
				take,
				where: { chatId },
				orderBy: {
					createdAt: "desc",
				},
			}),
			meta: {
				page,
				take,
				totalPages: Math.ceil(count / take),
			},
		};
	},
	createMessage: async function (data: MessageCreate): Promise<Message> {
		const message = await PrismaClient.$transaction(async (tx) => {
			const message = await tx.message.create({
				data,
			});
			await tx.chat.update({
				where: {
					id: data.chatId,
				},
				data: {
					lastMessage: {
						connect: {
							id: message.id,
						},
					},
				},
			});
			return message;
		});
		return message;
	},
};
