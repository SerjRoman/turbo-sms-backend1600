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

const app = express();

const httpServer = createServer(app);

const socketManager = new SocketManager(httpServer);

socketManager.useMiddleware(authenticateSocketMiddleware);
// DI - Dependency Injection
// DIP - Dependency Inversion Principle
ChatSocketController.registerHandlers(socketManager);

app.use(cors());
app.use(express.json());
app.use("/media/", express.static(uploadDir));
app.use(logMiddleware);

app.use(appRoutes);

app.use(errorHandlerMiddleware);

socketManager.initConnection((socket) => {
	socket.join("user:" + socket.data.userId);
	console.log(`User ${socket.data.userId} connected to WebSocket`);
});

httpServer.listen(env.PORT, env.HOST, () => {
	console.log(`Server is started on: http://${env.HOST}:${env.PORT}`);
	console.log(`WS Server is started on: ws://${env.HOST}:${env.PORT}`);
});
