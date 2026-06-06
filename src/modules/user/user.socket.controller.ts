import {
	ServerSocket,
	ClientSocket,
	SocketManagerContract,
} from "../../socket/socket.types";
import { UserSocketControllerContract } from "./types/user.contracts";
import {
	GetOnlineUsersPayload,
	GetOnlineUsersAcknowledgment,
	SubscribeAndGetInitialStatusesAcknowledgment,
	SubscribeAndGetInitialStatusesPayload,
	UserStatus,
	GetUserStatusAcknowledgment,
} from "./types/user.types";
import { UserService } from "./user.service";

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
		socketManager.addEvent(
			"subscribeAndGetInitialStatuses",
			(socket, payload, ack) => {
				this.subscribeAndGetInitialStatuses(
					socketManager.ioServer,
					socket,
					payload,
					ack,
				);
			},
		);
		socketManager.addEvent("getUserStatus", (socket, payload, ack) => {
			this.getUserStatus(socketManager.ioServer, payload.userId, ack);
		});
	},
	subscriptionsMap: new Map(),
	subscribeAndGetInitialStatuses: function (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: SubscribeAndGetInitialStatusesPayload,
		ack?: SubscribeAndGetInitialStatusesAcknowledgment,
	): void {
		const statuses: UserStatus[] = [];
		for (const userId of payload.userIds) {
			if (this.isUserOnline(ioServer, userId)) {
				statuses.push({ userId, status: "online" });
			} else {
				statuses.push({ userId, status: "offline" });
			}
			if (!this.subscriptionsMap.has(userId)) {
				this.subscriptionsMap.set(userId, new Set());
			}
			this.subscriptionsMap.get(userId)?.add(socket.data.userId);
		}
		if (typeof ack === "function") {
			ack({ statuses });
		}
	},
	notifySubscribedUsers: function (
		ioServer: ServerSocket,
		userId: number,
		status: "online" | "offline",
	): void {
		const subscribers = this.subscriptionsMap.get(userId);
        console.log(subscribers)
		if (!subscribers) {
			return;
		}
		for (const subscriberId of subscribers) {
			const userRoom = `user:${subscriberId}`;
			ioServer.to(userRoom).emit("userStatusUpdated", {
				userId,
				status,
			});
		}
	},
	getUserStatus: function (
		ioServer: ServerSocket,
		userId: number,
		ack?: GetUserStatusAcknowledgment,
	): void {
		const status: UserStatus = {
			userId,
			status: this.isUserOnline(ioServer, userId) ? "online" : "offline",
		};
		if (typeof ack === "function") {
			ack({ status });
		}
	},
	updateLastSeenAt: async function (userId) {
		await UserService.updateLastSeenAt(userId);
	},
};
