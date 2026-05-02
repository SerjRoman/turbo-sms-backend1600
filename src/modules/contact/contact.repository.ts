<<<<<<< HEAD
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
					avatar: data.avatar,
					contactUser: { connect: { id: data.contactUserId } },
					contactOwner: { connect: { id: data.contactOwnerId } },
				}
			});
			return createContact;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
				throw new ConflictError("Contact already exists");
			}
			throw error;
		}
	},
};
=======
// import { PrismaClient } from "../../prisma/client"
// import { CreateContact, UserContact } from "./types/contact.types"
// import { ContactRepositoryContract } from "./types/contact.contract"

// export const ContactRepository: ContactRepositoryContract = {
//     async findAllbuOwnerI(ownerId: number): Promise<UserContact[]> {
//         try {
//             return await PrismaClient.contact.findMany({
//                 where: { contactOwnerId: ownerId },
//             });
//         } catch (error) {
//             if (error instanceof PrismaClientKnownRequestError) {
// 				if (["P2000", "P2005", "P2006", "P2007", "P2009"].includes(error.code)) {
// 					throw new ValidationError("WRONG_QUERY");
// 				}
// 				if (error.code === "P2022") {
// 					throw new InternalServerError("WRONG_DATABASE");
// 				}
// 			}
// 			throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
//         }
//     },

//     async findById(id: number) {
//         return await PrismaClient.contact.findUnique({
//             where: {id},
//             include: {
//                 contactUser: {
//                     select: {
//                         username: true,
//                         avatar: true
//                     }
//                 }
//             }
//         })
//     },

//     async create(data: CreateContact){
//         const createContac  await PrismaClient.contact.create({data})
//         return createContact
//     }
// }
>>>>>>> master
