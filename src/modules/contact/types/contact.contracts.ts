import { Request, Response, NextFunction } from "express";
import type {
    Contact,
    ContactPlain,
    CreateContactDto,
    GetAllContactsDto,
    GetContactByIdDto,
} from "./contact.types";
import { AuthenticatedUser } from "../../../types/token.types";

export interface ContactServiceContract {
    getAll: (dto: GetAllContactsDto) => Promise<Contact[]>;
    getById: (dto: GetContactByIdDto) => Promise<Contact>;
    create: (dto: CreateContactDto) => Promise<ContactPlain>;
}

export interface ContactRepositoryContract {
    findAllByOwnerId: (ownerId: number) => Promise<Contact[]>;
    findById: (id: number) => Promise<Contact | null>;
    create: (data: ContactCreateInput) => Promise<ContactPlain>;
}

export interface ContactControllerContract {
    getAll: (
        req: Request,
        res: Response<Contact[], AuthenticatedUser>,
        next: NextFunction,
    ) => void;
    getById: (
        req: Request<{ id: string }>,
        res: Response<Contact, AuthenticatedUser>,
        next: NextFunction,
    ) => void;
    create: (
        req: Request,
        res: Response<ContactPlain, AuthenticatedUser>,
        next: NextFunction,
    ) => void;
}

import type { ContactCreateInput } from "./contact.types";