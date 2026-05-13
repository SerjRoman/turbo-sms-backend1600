import { ClientSocket, SocketManagerContract } from "../../socket/socket.types";
import { MessageService } from "./message.service";
import { MessageSocketControllerContact } from "./types/message.contracts";
import { SendMessagePayload, Message } from "./types/message.types";

export const MessageSocketController: MessageSocketControllerContact = {
	sendMessage: async function (
		socket: ClientSocket,
		payload: SendMessagePayload,
	): Promise<void> {
		try {
			const message = await MessageService.sendMessage({
				...payload,
				senderId: socket.data.userId,
			});
			this.newChatMessage(socket, message);
		} catch (error) {
			console.error(error);
		}
	},
	newChatMessage: function (socket: ClientSocket, payload: Message): void {
		throw new Error("Function not implemented.");
	},
	registerHandlers: function (socketManager: SocketManagerContract): void {
		socketManager.addEvent("sendMessage", this.sendMessage);
	},
};
