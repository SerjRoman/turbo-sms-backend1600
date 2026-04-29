import type { ContactRepositoryContract } from "./types/contact.contracts";
import { PrismaClient } from "../../prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import {
    ConflictError,
    InternalServerError,
    ValidationError,
} from "../../errors/app.errors";


export const ContactRepository: ContactRepositoryContract = {
    async getAllContactsByOwnerId(ownerId) {
        try {
            return await PrismaClient.contact.findMany({
                where: { contactOwnerId: ownerId },
                include: {
                    contactUser: {
                        id: true,
                        username: true,
                        lastSeenAt: true,
                    }
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (
                    ["P2000", "P2005", "P2006", "P2007", "P2009"].includes(
                        error.code,
                    )
                ) {
                    console.log("Wrong query passed by user.");
                    throw new ValidationError("WRONG_QUERY");
                }
                if (error.code === "P2022") {
                    console.log("DB error. Check migrations.");
                    throw new InternalServerError("WRONG_DATABASE");
                }
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async getContactById(contactId) {
        try {
            return await PrismaClient.contact.findUnique({
                where: { id: contactId },
                include: {
                    contactUser: {
                        id: true,
                        username: true,
                        lastSeenAt: true,
                    }
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (
                    ["P2000", "P2005", "P2006", "P2007", "P2009"].includes(
                        error.code,
                    )
                ) {
                    console.log("Wrong query passed by user.");
                    throw new ValidationError("WRONG_QUERY");
                }
                if (error.code === "P2022") {
                    console.log("DB error. Check migrations.");
                    throw new InternalServerError("WRONG_DATABASE");
                }
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async createContact(data) {
        try {
            return await PrismaClient.contact.create({ data });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    console.log("Contact already exists.");
                    throw new ConflictError("Contact");
                }
                if (error.code === "P2011") {
                    console.log("Service didn't pass enough values for create Contact");
                    throw new ValidationError("NOT_ENOUGH_VALUES");
                }
                if (["P2000", "P2005", "P2006", "P2007"].includes(error.code)) {
                    console.log("Wrong query passed by user.");
                    throw new ValidationError("WRONG_QUERY");
                }
                if (error.code === "P2022") {
                    console.log("DB error. Check migrations.");
                    throw new InternalServerError("WRONG_DATABASE");
                }
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};l
