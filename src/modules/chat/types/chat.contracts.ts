import type { NextFunction, Request, Response } from "express";
import type {
	ClientSocket,
	SocketController,
} from "../../../socket/socket.types";
import type {
	Chat,
	ChatParticipant,
	ChatWithParticipantInfo,
	ChatWithParticipants,
	CreateChat,
	CreateChatDto,
	JoinChatCallback,
	JoinChatPayload,
	LeaveChatPayload,
} from "./chat.types";
import { AuthenticatedUser } from "../../../types/token.types";

export interface ChatSocketControllerContract extends SocketController {
	joinChat: (
		socket: ClientSocket,
		payload: JoinChatPayload,
		ack?: JoinChatCallback,
	) => void;
	leaveChat: (socket: ClientSocket, payload: LeaveChatPayload) => void;
}

export interface ChatServiceContract {
	isUserInChat: (userId: number, chatId: number) => Promise<boolean>;
	getChatWithParticipants: (chatId: number) => Promise<ChatWithParticipants>;
	getMyChats(ownerId: number): Promise<ChatWithParticipantInfo[]>;
	create: (dto: CreateChatDto) => Promise<Chat>;
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
	) => Promise<ChatWithParticipantInfo[]>;
	getChatByParticipants: (
		userId1: number,
		userId2: number,
	) => Promise<Chat | null>;
	create: (data: CreateChat) => Promise<Chat>;
}

export interface ChatControllerContract {
	// getChatParticipant: (
	// 	req: Request<>,
	// 	res: Response<>,
	// 	next: NextFunction
	// )
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
			ChatWithParticipantInfo[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatWithParticipantInfo[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
}

// create: {contactUserId: number}
