import { NotFoundError } from "../../errors/app.errors";
import { ChatService } from "./chat.service";
import type { ChatSocketControllerContract } from "./types/chat.contracts";

export const ChatSocketController: ChatSocketControllerContract = {
	async joinChat(socket, payload, ack) {
		try {
			const isChatParticipant = await ChatService.isUserInChat(
				socket.data.userId,
				payload.chatId,
			);
			if (isChatParticipant) {
				socket.join("chat:" + payload.chatId);
				console.log(
					`User ${socket.data.userId} joined chat ${payload.chatId}`,
				);
				if (ack) {
					ack({ status: "ok" });
				}
			} else {
				if (ack) {
					ack({
						status: "error",
						message: `User:${socket.data.userId} is not a member of chat:${payload.chatId}`,
					});
				}
			}
		} catch (error) {
			console.error(error);
			if (ack) {
				if (error instanceof Error)
					ack({ status: "error", message: error.message });
				else if (error instanceof NotFoundError) {
					ack({
						status: "error",
						message: `Chat:${payload.chatId} not found`,
					});
				} else ack({ status: "error", message: "Unknown Error" });
			}
		}
	},
	leaveChat(socket, payload) {
		socket.leave("chat:" + payload.chatId);
		console.log(`User ${socket.data.userId} left chat ${payload.chatId}`);
	},
	registerHandlers: function (socketManager) {
		socketManager.addEvent("joinChat", this.joinChat);
		socketManager.addEvent("leaveChat", this.leaveChat);
	},
};
