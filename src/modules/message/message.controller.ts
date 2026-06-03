import { NextFunction, Request, Response } from "express";
import {
	PaginatedResponse,
	PaginationParams,
	paginationSchema,
} from "../../types/pagination.types";
import { AuthenticatedUser } from "../../types/token.types";
import { MesageControllerContract } from "./types/message.contracts";
import { Message } from "./types/message.types";
import { MessageService } from "./message.service";
import { getAllMessageSchema } from "./message.schema";

export const MessageController: MesageControllerContract = {
	getAllMessagesByChat: async function (
		req,
		res,
		next: NextFunction,
	): Promise<void> {
		try {
			const params = await getAllMessageSchema.validate(req.params);
			const pagination = await paginationSchema.validate(req.query);

			res.json(
				await MessageService.getAllMessagesByChat(
					params.chatId,
					pagination,
				),
			);
		} catch (error) {
			next(error);
		}
	},
	async uploadMessageMedia(req, res, next) {
		try {
			const file = req.file;
			if (!file?.filename) {
				res.status(404).json({ message: "File is not found!" });
				return;
			}
			res.status(200).json({ media: file.filename });
		} catch (error) {
			next(error);
		}
	},
};
