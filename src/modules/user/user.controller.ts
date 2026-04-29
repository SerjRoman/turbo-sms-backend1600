import { Request, Response } from "express";
import { AuthenticatedUser } from "../../types/token.types";
import { UserControllerContract } from "./types/user.contracts";
import {
	LoginCredentials,
	RegisterCredentials,
	User,
} from "./types/user.types";
import { UserService } from "./user.service";

export const UserController: UserControllerContract = {
	login: async function (
		req: Request<object, { token: string }, LoginCredentials>,
		res: Response<{ token: string }>,
		next,
	) {
		try {
			const token = await UserService.login(req.body);
			res.status(201).json(token);
		} catch (error) {
			next(error);
		}
	},
	register: async function (
		req: Request<object, { token: string }, RegisterCredentials>,
		res: Response<{ token: string }>,
		next,
	) {
		try {
			const token = await UserService.register({
				...req.body,
				avatar: req.file?.filename,
			});
			res.status(201).json(token);
		} catch (error) {
			next(error);
		}
	},
	me: async function (
		req: Request<object, User, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next,
	) {
		try {
			const me = await UserService.me({ userId: res.locals.userId });
			res.status(201).json(me);
		} catch (error) {
			next(error);
		}
	},

	async findByUsername(req, res, next) {
		try {
			const { username } = req.params;
			const user = await UserService.findByUsername(username);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
};
