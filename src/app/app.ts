import express from "express";
import cors from "cors";
import { env } from "../config/env";
import { logMiddleware } from "../middlewares/log.middleware";
import { errorHandlerMiddleware } from "../middlewares/error-handler.middleware";
import { authenticateSocketMiddleware } from "../middlewares/authenticate.middleware";
import { appRoutes } from "./routes";
import { uploadDir } from "../config/path";
import { createServer } from "node:http";
import { SocketManager } from "../socket";
import { ChatSocketController } from "../modules/chat/chat.socket.controller";
import { UserSocketController } from "../modules/user/user.socket.controller";
import { MessageSocketController } from "../modules/message/message.socket.controller";
import { USER_ROOM_PREFIX } from "../modules/user/user.constants";

const app = express();

const httpServer = createServer(app);

const socketManager = new SocketManager(httpServer);

socketManager.useMiddleware(authenticateSocketMiddleware);
// DI - Dependency Injection
// DIP - Dependency Inversion Principle
ChatSocketController.registerHandlers(socketManager);
UserSocketController.registerHandlers(socketManager);
MessageSocketController.registerHandlers(socketManager);

app.use(cors());
app.use(express.json());
app.use("/media/", express.static(uploadDir));
app.use(logMiddleware);

app.use(appRoutes);

app.use(errorHandlerMiddleware);

socketManager.initConnection((socket) => {
	socket.join(USER_ROOM_PREFIX + socket.data.userId);
	console.log(`User ${socket.data.userId} connected to WebSocket`);
	UserSocketController.notifySubscribedUsers(
		socketManager.ioServer,
		socket.data.userId,
		"online",
	);
	socket.on("disconnect", () => {
		socket.leave(USER_ROOM_PREFIX + socket.data.userId);
		UserSocketController.notifySubscribedUsers(
			socketManager.ioServer,
			socket.data.userId,
			"offline",
		);
		UserSocketController.updateLastSeenAt(socket.data.userId);
	});
});

httpServer.listen(env.PORT, env.HOST, () => {
	console.log(`Server is started on: http://${env.HOST}:${env.PORT}`);
	console.log(`WS Server is started on: ws://${env.HOST}:${env.PORT}`);
});
