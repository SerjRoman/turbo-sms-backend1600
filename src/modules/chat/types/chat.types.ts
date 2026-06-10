import type { Prisma } from "../../../generated/prisma";
export type Chat = Prisma.ChatGetPayload<{}>;
export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;

export interface JoinChatPayload {
	chatId: number;
}

export interface LeaveChatPayload {
	chatId: number;
}
export type CreateChat = {
	ownerId: number;
	contactUserId: number;
};
export interface ChatClientEvents {
	joinChat: (payload: JoinChatPayload, ack?: JoinChatCallback) => void;
	leaveChat: (payload: LeaveChatPayload) => void;
}
export interface ChatServerEvents {
	chatUpdate: (payload: ChatWithLastMessage) => void;
}
export type ChatWithParticipants = Prisma.ChatGetPayload<{
	include: {
		participants: true;
	};
}>;
export type ChatParticipant = Prisma.ChatParticipantGetPayload<{}>;
/*
    acknowledgment(ack) - это функция, 
    которая может быть вызвана на стороне сервера для отправки подтверждения обратно клиенту после обработки события.
    Когда клиент отправляет событие на сервер, он может передать функцию обратного вызова в качестве аргумента. 
    Эта функция будет вызвана сервером после обработки события, и в нее можно передать данные или статус выполнения.
*/
export type ChatWithParticipantInfo = Prisma.ChatGetPayload<{
	include: {
		lastMessage: true;
		participants: {
			include: {
				user: {
					select: {
						id: true;
						name: true;
						surname: true;
						avatar: true;
						contactsOf: {
							select: {
								id: true;
								localName: true;
								avatar: true;
							};
						};
					};
				};
			};
		};
	};
}>;
export type ChatWithLastMessage = Prisma.ChatGetPayload<{
	include: { lastMessage: true };
}>;
export type CreateChatDto = { ownerId: number; contactUserId: number };
export interface ChatUpdatePayload {
	chatId: number;
}
