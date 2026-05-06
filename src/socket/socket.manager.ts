// ООП - Объектно-ориентированное программирование

import { Server as HttpServer } from "node:http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { ClientSocket } from "./socket.types";

export class SocketManager {
	private readonly ioServer: SocketIOServer;
	constructor(httpServer: HttpServer) {
		this.ioServer = new SocketIOServer(httpServer, {
			cors: {
				origin: "*",
			},
		});
	}
	initConnection() {
		this.ioServer.on("connection", (socket: ClientSocket) => {
			console.log("New client connected: ", socket.id);

			socket.on("disconnect", () => {
				console.log("Client disconnected: ", socket.id);
			});
		});
	}
	useMiddleware(
		middleware: (socket: Socket, next: (error?: Error) => void) => void,
	) {
		this.ioServer.use(middleware);
	}
}
