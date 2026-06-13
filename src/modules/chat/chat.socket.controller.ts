import { NotFoundError } from "../../errors/app.errors";
import type { ServerSocket, ClientSocket } from "../../socket/socket.types";
import { USER_ROOM_PREFIX } from "../user/user.constants";
import { ChatService } from "./chat.service";
import type { ChatSocketControllerContract } from "./types/chat.contracts";
import type { ChatUpdatePayload } from "./types/chat.types";

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
	chatUpdate: async function (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: ChatUpdatePayload,
	): Promise<void> {
		const chat = await ChatService.getMyChat(payload.chatId);
		if (!chat) {
			return;
		}
		for (const user of chat.participants) {
			const roomName = `${USER_ROOM_PREFIX}${user.userId}`;
			const hasRoom = ioServer.sockets.adapter.rooms.has(roomName);
			if (hasRoom) {
				ioServer.to(roomName).emit("chatUpdate", chat);
			}
		}
	},
};
