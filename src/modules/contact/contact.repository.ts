import { ContactRepositoryContract } from "./types/contact.contracts";
import type { Contact, ContactCreateInput, ContactPlain } from "./types/contact.types";
import { PrismaClient } from "../../prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import {
    ConflictError,
    InternalServerError,
    ValidationError,
} from "../../errors/app.errors";

const contactUserSelect = {
    id: true,
    username: true,
    lastSeenAt: true,
} as const;

export const ContactRepository: ContactRepositoryContract = {
    async findAllByOwnerId(ownerId: number): Promise<Contact[]> {
        try {
            return await PrismaClient.contact.findMany({
                where: { contactOwnerId: ownerId },
                include: {
                    contactUser: {
                        select: contactUserSelect,
                    },
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

    async findById(id: number): Promise<Contact | null> {
        try {
            return await PrismaClient.contact.findFirst({
                where: { id },
                include: {
                    contactUser: {
                        select: contactUserSelect,
                    },
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

    async create(data: ContactCreateInput): Promise<ContactPlain> {
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
};