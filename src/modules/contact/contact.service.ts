import { NotFoundError } from "../../errors/app.errors";
import { ContactServiceContract } from "./types/contact.contracts";
import { ContactRepository } from "./contact.repository";
import { UserRepository } from "../user/user.repository";

export const ContactService: ContactServiceContract = {
    async getAll({ ownerId }) {
        return await ContactRepository.findAllByOwnerId(ownerId);
    },

    async getById({ id }) {
        const contact = await ContactRepository.findById(id);
        if (!contact) {
            throw new NotFoundError("Contact");
        }
        return contact;
    },

    async create(dto) {
        let avatar = dto.avatar;

        if (!avatar) {
            const contactUser = await UserRepository.findById(dto.contactUserId);
            avatar = contactUser.avatar ?? "";
        }

        return await ContactRepository.create({
            localName: dto.localName,
            avatar: avatar,
            contactOwnerId: dto.ownerId,
            contactUserId: dto.contactUserId,
        });
    },
};