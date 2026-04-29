import { PrismaClient } from "../../prisma/client"
import { CreateContact, UserContact } from "./types/contact.types"
import { ContactRepositoryContract } from "./types/contact.contract"
import { InternalServerError, ValidationError } from "../../errors/app.errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/wasm-compiler-edge";

export const ContactRepository: ContactRepositoryContract = {
    async findAll(ownerId: number): Promise<{ id: number; localName: string; avatar: string; createdAt: Date; updatedAt: Date; contactUserId: number; contactOwnerId: number; }[]> {
        try {
            const contacts = await PrismaClient.contact.findMany({
                where: { contactOwnerId: ownerId },
                include: {
                    contactUser: {
                        select: {
                            username: true,
                            surname: true,
                            avatar: true
                        }
                    }
                }
            });
            return contacts.map(contact => ({
                id: contact.id,
                localName: contact.localName,
                avatar: contact.avatar,
                createdAt: contact.createdAt,
                updatedAt: contact.updatedAt,
                contactUserId: contact.contactUserId,
                contactOwnerId: contact.contactOwnerId
            }))
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
				if (["P2000", "P2005", "P2006", "P2007", "P2009"].includes(error.code)) {
					throw new ValidationError("WRONG_QUERY");
				}
				if (error.code === "P2022") {
					throw new InternalServerError("WRONG_DATABASE");
				}
			}
			throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async findById(id: number) {
        return await PrismaClient.contact.findUnique({
            where: {id},
            include: {
                contactUser: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            }
        })
    },

    async create(data: CreateContact){
        const createContact =  await PrismaClient.contact.create({data})
        return createContact
    }
}