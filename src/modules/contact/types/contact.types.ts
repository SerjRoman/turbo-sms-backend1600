import { Prisma } from "../../../generated/prisma";

export type Contact = Prisma.ContactGetPayload<{
    include: {
        contactUser: {
            select: { id: true; username: true; lastSeenAt: true };
        };
    };
}>;

export type ContactPlain = Prisma.ContactGetPayload<{}>;

export type ContactCreateInput = Prisma.ContactUncheckedCreateInput;

export type GetAllContactsDto = {
    ownerId: number;
};

export type GetContactByIdDto = {
    id: number;
};

export type CreateContactDto = {
    localName: string;
    avatar?: string;
    contactUserId: number;
    ownerId: number;
};