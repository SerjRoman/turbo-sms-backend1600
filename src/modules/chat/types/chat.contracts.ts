import type {
	ClientSocket,
	SocketManagerContract,
} from "../../../socket/socket.types";
import type {
	JoinChatCallback,
	JoinChatPayload,
	LeaveChatPayload,
} from "./chat.types";

export interface ChatSocketControllerContract {
	registerHandlers: (socketManager: SocketManagerContract) => void;
	joinChat: (
		socket: ClientSocket,
		payload: JoinChatPayload,
		ack?: JoinChatCallback,
	) => void;
	leaveChat: (socket: ClientSocket, payload: LeaveChatPayload) => void;
}
