import { ContactControllerContract } from "./types/contact.contracts";
import { ContactService } from "./contact.service";
import { BadRequestError } from "../../errors/app.errors";


export const ContactController: ContactControllerContract = {
    getAllContactsByOwner: async function (
        req, res, next
    ) {
        try {
            const contacts = await ContactService.getAllContactsByOwner({
                ownerId: res.locals.userId,
            });
            res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }
    },

    getContactById: async function (
        req, res, next,
    ) {
        try {
            if (!req.params.id) {
                throw new BadRequestError("No id provided!");
            }
            const contact = await ContactService.getContactById({
                id: +req.params.id,
            });
            res.status(200).json(contact);
        } catch (error) {
            next(error);
        }
    },

    createContact: async function (
        req, res, next,
    ) {
        try {
            const contactUserId = +req.body.contactUserId;
            // const avatar: string | undefined = req.file?.filename;

            const contact = await ContactService.createContact({
                localName: req.body.localName as string,
                // ...(avatar !== undefined && { avatar }),
                contactUserId,
                ownerId: res.locals.userId,
            });
            res.status(200).json(contact);
        } catch (error) {
            next(error);
        }
    },
};
