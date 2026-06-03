import {
	ClientSocket,
	ServerSocket,
	SocketManagerContract,
} from "../../socket/socket.types";
import { MessageService } from "./message.service";
import { MessageSocketControllerContact } from "./types/message.contracts";
import { SendMessagePayload, Message } from "./types/message.types";

export const MessageSocketController: MessageSocketControllerContact = {
	sendMessage: async function (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: SendMessagePayload,
	): Promise<void> {
		try {
			const message = await MessageService.sendMessage({
				...payload,
				senderId: socket.data.userId,
			});
			this.newChatMessage(ioServer, socket, message);
		} catch (error) {
			console.error(error);
		}
	},
	newChatMessage: function (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: Message,
	): void {
		ioServer.to("chat:" + payload.chatId).emit("newChatMessage", payload);
	},
	registerHandlers: function (socketManager: SocketManagerContract): void {
		socketManager.addEvent("sendMessage", (socket, payload) => {
			console.log(payload);
			this.sendMessage(socketManager.ioServer, socket, payload);
		});
	},
};
