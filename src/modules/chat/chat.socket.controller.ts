import type { ChatSocketControllerContract } from "./types/chat.contracts";

export const ChatSocketController: ChatSocketControllerContract = {
	joinChat(socket, payload, ack) {
		socket.join("chat:" + payload.chatId);
		console.log(`User ${socket.data.userId} joined chat ${payload.chatId}`);
		if (ack) {
			ack({ status: "ok" });
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
