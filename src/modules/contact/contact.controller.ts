import type { NextFunction, Request, Response } from "express";
import { ContactService } from "./contact.service";
import { ContactsControllerContract } from "./types/contact.contracts";
import { Contact } from "./types/contact.types";
import { BadRequestError, NotFoundError } from "../../errors/app.errors";
import { createContactSchema } from "./contact.schema";

export const ContactController: ContactsControllerContract = {
	async getAll(
		req: Request<object, Contact[]>,
		res: Response<Contact[]>,
		next: NextFunction,
	) {
		try {
			const userId = +res.locals.userId;
			const contacts = await ContactService.getAll(userId);
			res.json(contacts);
		} catch (error) {
			next(error);
		}
	},

	async getContactById(req, res, next) {
		try {
			const id = +req.params.id;
			const ownerId = +res.locals.userId;

			if (!id) {
				throw new BadRequestError("Id is required");
			}

			const contact = await ContactService.getContactById(id, ownerId);
			if (!contact) {
				throw new NotFoundError("Contact not found");
			}
			res.json(contact);
		} catch (error) {
			next(error);
		}
	},

	async create(req, res, next) {
		try {
			const ownerId = +res.locals.userId;

			const validated = await createContactSchema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});

			const { localName, contactUserId } = validated;

			const contact = await ContactService.create(
				localName,
				+contactUserId,
				ownerId,
			);
			res.status(201).json(contact);
		} catch (error) {
			next(error);
		}
	},
};
