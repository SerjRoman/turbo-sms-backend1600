import { ConflictError } from "../../errors/app.errors";
import { PrismaClient } from "../../prisma/client";
import { ContactRepositoryContract } from "./types/contact.contracts";
import { CreateContact } from "./types/contact.types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const ContactRepository: ContactRepositoryContract = {
	async findAll(ownerId: number) {
		const contacts = await PrismaClient.contact.findMany({
			where: { contactOwnerId: ownerId },
			include: {
				contactUser: {
					select: {
						id: true,
						username: true,
						avatar: true,
					},
				},
			},
		});
		return contacts;
	},

	async findById(id: number) {
		return await PrismaClient.contact.findUnique({
			where: { id },
			include: {
				contactUser: {
					select: {
						id: true,
						username: true,
						lastSeenAt: true,
					},
				},
			},
		});
	},

	async findUserByName(username: string) {
		const user = await PrismaClient.user.findUnique({
			where: { username },
		});
		return user;
	},

	async create(data: CreateContact) {
		try {
			const createContact = await PrismaClient.contact.create({
				data: {
					localName: data.localName,
					avatar: data.avatar || null,
					contactUser: { connect: { id: data.contactUserId } },
					contactOwner: { connect: { id: data.contactOwnerId } },
				},
			});
			return createContact;
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2002"
			) {
				throw new ConflictError("Contact already exists");
			}
			throw error;
		}
	},
};
