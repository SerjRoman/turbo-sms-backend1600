import { Prisma } from "../../../generated/prisma";

export type ContactWithUser = Prisma.ContactGetPayload<{
    include: {
        contactUser: {
            omit: { password: true };
        };
    };
}>;

export type Contact = Prisma.ContactGetPayload<{}>;

export type GetContactByIdDTO = {
    id: number;
};

export type CreateContactDto = {
    localName: string;
    contactUserId: number;
};
