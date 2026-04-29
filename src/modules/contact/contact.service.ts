import { ContactRepository } from "./contact.repository";
import { ContactServiceContract } from "./types/contact.contract";
import { NotFoundError } from "../../errors/app.errors";
import { CreateContact } from "./types/contact.types";


export const ContactService: ContactServiceContract = {
    async findAll(userId: number){
        const contacts = await ContactRepository.findAll(userId)
        return contacts
    },

    async findById(id: number, ownerId: number){
        const contact = await ContactRepository.findById(id)
        if (!contact){
            throw new NotFoundError("Contact not found")
        }
        if (contact.contactOwnerId !== ownerId){
            throw new NotFoundError("Contact not found")
        }
        return contact
    },

    async create(data: CreateContact){
		const contact = await ContactRepository.create(data);
		return contact;
    }
}