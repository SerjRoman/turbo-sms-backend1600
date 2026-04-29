import { Request, Response, NextFunction } from "express";
import type {
    Contact,
    CreateContactDto,
} from "./contact.types";
import { AuthenticatedUser } from "../../../types/token.types";

export interface ContactServiceContract {
    getAllContactsByOwner: (ownerId: number) => Promise<Contact[]>;
    getContacfById: (contactId: number) => Promise<Contact>;
    createContact: (data: CreateContactDto) => Promise<Contact>;
}

export interface ContactRepositoryContract {
    getAllContactsByOwnerId: (ownerId: number) => Promise<Contact[]>;
    getContactById: (contactId: number) => Promise<Contact | null>;
    createContact: (data: CreateContactDto) => Promise<Contact>;
}

export interface ContactControllerContract {
    getAllContacts: (
        req: Request<object, Contact[]>,
        res: Response<Contact[], AuthenticatedUser>,
        next: NextFunction,
    ) => void;
    getContactById: (
        req: Request<{ id: string }>,
        res: Response<Contact, AuthenticatedUser>,
        next: NextFunction,
    ) => void;
    createContact: (
        req: Request<object, Contact, CreateContactDto>,
        res: Response<Contact, AuthenticatedUser>,
        next: NextFunction,
    ) => void;
}
