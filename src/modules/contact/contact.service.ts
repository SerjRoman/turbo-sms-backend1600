import { NotFoundError } from "../../errors/app.errors";
import { ContactServiceContract } from "./types/contact.contracts";
import { ContactRepository } from "./contact.repository";


export const ContactService: ContactServiceContract = {
    async getAllContactsByOwner( ownerId ) {
        return await ContactRepository.getAllContactsByOwner(ownerId);
    },

    async getContactById( contactId ) {
        const contact = await ContactRepository.getContactById(id);
        if (!contact) {
            throw new NotFoundError("Contact");
        }
        return contact;
    },

    async createContact(data) {
        // let avatar = dto.avatar;

        // if (!avatar) {
        //    const contactUser = await UserRepository.findById(dto.contactUserId);
        //    avatar = contactUser.avatar ?? "";
        // }

        return await ContactRepository.create(data);
    },
}
