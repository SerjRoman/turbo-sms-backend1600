import type { NextFunction, Request, Response } from "express";
import type {
	ClientSocket,
	ServerSocket,
	SocketController,
} from "../../../socket/socket.types";
import type {
	Chat,
	ChatParticipant,
	ChatUpdatePayload,
	ChatWithUsertInfo,
	ChatWithParticipants,
	CreateChat,
	CreateChatDto,
	JoinChatCallback,
	JoinChatPayload,
	LeaveChatPayload,
	ChatWithParticipantInfo,
} from "./chat.types";
import type { AuthenticatedUser } from "../../../types/token.types";

export interface ChatSocketControllerContract extends SocketController {
	joinChat: (
		socket: ClientSocket,
		payload: JoinChatPayload,
		ack?: JoinChatCallback,
	) => void;
	leaveChat: (socket: ClientSocket, payload: LeaveChatPayload) => void;
	chatUpdate: (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: ChatUpdatePayload,
	) => void;
}

export interface ChatServiceContract {
	isUserInChat: (userId: number, chatId: number) => Promise<boolean>;
	getChatWithParticipants: (chatId: number) => Promise<ChatWithParticipants>;
	getMyChats(ownerId: number): Promise<ChatWithUsertInfo[]>;
	create: (dto: CreateChatDto) => Promise<Chat>;
	getMyChat: (chatId: number) => Promise<ChatWithUsertInfo | null>;
}
export interface ChatRepositoryContract {
	getChatParticipant: (
		userId: number,
		chatId: number,
	) => Promise<ChatParticipant | null>;
	getChatWithParticipants: (
		chatId: number,
	) => Promise<ChatWithParticipants | null>;
	getChatsWithParticipantInfo: (
		ownerId: number,
	) => Promise<ChatWithUsertInfo[]>;
	getChatWithParticipantInfo: (
		chatId: number,
	) => Promise<ChatWithParticipantInfo | null>;
	getChatByParticipants: (
		userId1: number,
		userId2: number,
	) => Promise<Chat | null>;
	create: (data: CreateChat) => Promise<Chat>;
}

export interface ChatControllerContract {
	create: (
		req: Request<
			object,
			Chat,
			{ contactUserId: number },
			object,
			AuthenticatedUser
		>,
		res: Response<Chat, AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getMyChats: (
		req: Request<
			object,
			ChatWithUsertInfo[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatWithUsertInfo[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
}
