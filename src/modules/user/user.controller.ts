import { Request, Response } from "express";
import { AuthenticatedUser } from "../../types/token.types";
import { UserControllerContract } from "./types/user.contracts";
import {
	LoginCredentials,
	RegisterCredentials,
	User,
} from "./types/user.types";
import { UserService } from "./user.service";
import { ValidationError } from "../../errors/app.errors";
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';

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
	findByUsername: async function (req, res, next) {
		try {
			if (!req.params.username) {
				throw new ValidationError("No username provided!");
			}
			const user = await UserService.findByUsername({
				username: req.params.username,
			});
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
};

id: async function (req, res, next) {
	try {
		if (!req.params.id) {
			throw new ValidationError("No user ID provided!");
		}
		const user = await UserService.findById({
			id: parseInt(req.params.id, 10),
		});
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
},

export class UsersController {
  private usersService: UsersService;
  
  constructor() {
    this.usersService = new UsersService();
  }
  
  findUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      
      if (!username) {
        return res.status(400).json({
          status: 'error',
          message: 'Username parameter is required',
        });
      }
      
      const user = await this.usersService.findUserByUsername(username);
      
      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}