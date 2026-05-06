import type {
	DefaultEventsMap,
	Socket,
	Server as SocketIOServer,
} from "socket.io";

// События, которые сервер может отправлять клиенту
export type AppServerEvents = DefaultEventsMap;
// События, которые клиент может отправлять серверу
export type AppClientEvents = DefaultEventsMap;

export interface AuthenticatedSocket {
	userId: number;
}

export type ClientSocket = Socket<
	AppClientEvents,
	AppServerEvents,
	object,
	AuthenticatedSocket
>;

export type ServerSocket = SocketIOServer<
	AppClientEvents,
	AppServerEvents,
	object,
	AuthenticatedSocket
>;
