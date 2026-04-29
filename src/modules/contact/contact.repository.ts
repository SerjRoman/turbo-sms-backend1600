import { PrismaClient } from "../../prisma/client"
import { CreateContact, Contact } from "./types/contact.types"
import { ContactRepositoryContract } from "./types/contact.contract"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ValidationError, InternalServerError } from "../../errors/app.errors"

export const ContactRepository: ContactRepositoryContract = {
    async findAll(ownerId: number): Promise<Contact[]> {
        try {
            return await PrismaClient.contact.findMany({
                where: { contactOwnerId: ownerId },
            });
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
        const contact = await PrismaClient.contact.create({data})
        return contact
    }
}

// ff