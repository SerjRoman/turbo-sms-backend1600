<<<<<<< HEAD
import { Prisma } from "../../../generated/prisma";


export type Contact = Prisma.ContactGetPayload<{}>;

export interface CreateContact {
	localName: string;
	avatar?: string | undefined;
	contactOwnerId: number;
	contactUserId: number;
}

export interface UserContact {
	id: number;
	givenName: string;
	avatar: string | undefined;
	ownerId: number;
	contactUser: {
		username: string;
		surname: string;
		avatar: string | undefined;
	};
	createdAt: Date;
}
=======
// import { Prisma } from "../../../generated/prisma";

// export type Contact = Prisma.ContactGetPayload<{}>;

// export interface CreateContact {
//     localName: string;
//     contactOwnerId: number;
//     contactUserId: number;
//     avatar?: string;
// }

// export interface UserContact {
//     id: number,
//     localName: string,
//     avatar: string | undefined,
//     ownerId: number;
//     contactUser: {
//         username: string, 
//         surname: string,
//         avatar: string | undefined,
//     }
//     createdAt: Date
// }

>>>>>>> master
