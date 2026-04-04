import { Router } from "express";
import { UserController } from "./user.controller";
import { validateMiddleware } from "../../middlewares/validate.middleware";
import { loginSchema, regSchema } from "./user.schema";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../../middlewares/upload.middleware";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";

export const UserRoutes = Router();

UserRoutes.post(
	"/login",
	validateMiddleware(loginSchema),
	UserController.login,
);
UserRoutes.post(
	"/register",
	validateMiddleware(regSchema),
	uploadMiddleware.single("avatar"),
	processImageMiddleware(200, 80),
	UserController.register,
);
UserRoutes.get("/me", authenticateMiddleware, UserController.me);
