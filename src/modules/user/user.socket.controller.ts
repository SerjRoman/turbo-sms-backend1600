import {
	ServerSocket,
	ClientSocket,
	SocketManagerContract,
} from "../../socket/socket.types";
import { UserSocketControllerContract } from "./types/user.contracts";
import {
	GetOnlineUsersPayload,
	GetOnlineUsersAcknowledgment,
} from "./types/user.types";

export const UserSocketController: UserSocketControllerContract = {
	getOnlineUsers: function (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: GetOnlineUsersPayload,
		ack?: GetOnlineUsersAcknowledgment,
	): void {
		const onlineUserIds: number[] = [];
		for (const userId of payload.userIds) {
			if (this.isUserOnline(ioServer, userId)) {
				onlineUserIds.push(userId);
			}
		}
		if (typeof ack === "function") {
			ack({ userIds: onlineUserIds });
		}
	},
	isUserOnline: function (ioServer: ServerSocket, id: number): boolean {
		return ioServer.sockets.adapter.rooms.has(`user:${id}`);
	},
	registerHandlers: function (socketManager: SocketManagerContract): void {
		socketManager.addEvent("getOnlineUsers", (socket, payload, ack) => {
			this.getOnlineUsers(socketManager.ioServer, socket, payload, ack);
		});
	},
};
