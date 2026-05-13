import type {
	ClientSocket,
	SocketController,
} from "../../../socket/socket.types";
import type {
	ChatParticipant,
	ChatWithParticipants,
	JoinChatCallback,
	JoinChatPayload,
	LeaveChatPayload,
} from "./chat.types";

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
}
export interface ChatRepositoryContract {
	getChatParticipant: (
		userId: number,
		chatId: number,
	) => Promise<ChatParticipant | null>;
	getChatWithParticipants: (
		chatId: number,
	) => Promise<ChatWithParticipants | null>;
}
