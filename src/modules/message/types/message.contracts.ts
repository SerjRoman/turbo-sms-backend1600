import type {
	Message,
	MessageCreate,
	SendMessageDto,
	SendMessagePayload,
} from "./message.types";
import type {
	PaginatedResponse,
	PaginationParams,
} from "../../../types/pagination.types";
import { ClientSocket, SocketController } from "../../../socket/socket.types";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedUser } from "../../../types/token.types";

// CQRS - Command/Query Responsibility Segregation
// DDD - Domain Driven Design

// query - PaginationParams
// route params - {chatId: number}

export type MesageControllerContract = {
	getAllMessagesByChat(
		req: Request<
			{ chatId: number },
			PaginatedResponse<Message>,
			object,
			PaginationParams,
			AuthenticatedUser
		>,
		res: Response<PaginatedResponse<Message>, AuthenticatedUser>,
		next: NextFunction,
	): Promise<void>;
};

export type MessageServiceContract = {
	getAllMessagesByChat(
		chatId: number,
		pagination: PaginationParams,
	): Promise<PaginatedResponse<Message>>; // Query/Read
	sendMessage(dto: SendMessageDto): Promise<Message>;
};

export type MessageRepositoryContract = {
	getAllMessagesByChat(
		chatId: number,
		pagination: PaginationParams,
	): Promise<PaginatedResponse<Message>>;
	createMessage(data: MessageCreate): Promise<Message>;
};

export interface MessageClientEvents {
	sendMessage: (payload: SendMessagePayload) => void;
}
export interface MessageServerEvents {
	newChatMessage: (message: Message) => void;
}

export interface MessageSocketControllerContact extends SocketController {
	sendMessage: (socket: ClientSocket, payload: SendMessagePayload) => void;
	newChatMessage: (socket: ClientSocket, payload: Message) => void;
}
