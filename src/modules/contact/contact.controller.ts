import { Request, Response } from "express";
import { AuthenticatedUser } from "../../types/token.types";
import { ContactControllerContract } from "./types/contact.contracts";
import { Contact, ContactPlain } from "./types/contact.types";
import { ContactService } from "./contact.service";
import { BadRequestError } from "../../errors/app.errors";

export const ContactController: ContactControllerContract = {
    getAll: async function (
        req: Request,
        res: Response<Contact[], AuthenticatedUser>,
        next,
    ) {
        try {
            const contacts = await ContactService.getAll({
                ownerId: res.locals.userId,
            });
            res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }
    },

    getById: async function (
        req: Request<{ id: string }>,
        res: Response<Contact, AuthenticatedUser>,
        next,
    ) {
        try {
            if (!req.params.id) {
                throw new BadRequestError("No id provided!");
            }
            const contact = await ContactService.getById({
                id: Number(req.params.id),
            });
            res.status(200).json(contact);
        } catch (error) {
            next(error);
        }
    },

    create: async function (
        req: Request,
        res: Response<ContactPlain, AuthenticatedUser>,
        next,
    ) {
        try {
            const contactUserId = Number(req.body.contactUserId);
            const avatar: string | undefined = req.file?.filename;

            const contact = await ContactService.create({
                localName: req.body.localName as string,
                ...(avatar !== undefined && { avatar }),
                contactUserId,
                ownerId: res.locals.userId,
            });
            res.status(201).json(contact);
        } catch (error) {
            next(error);
        }
    },
};