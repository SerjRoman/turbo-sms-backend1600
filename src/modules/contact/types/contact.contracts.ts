import type { NextFunction, Request, Response } from "express";
import { Contact, CreateContact } from "./contact.types";
import { User } from "../../../generated/prisma";

export interface ContactRepositoryContract {
    findAll(ownerId: number): Promise<Contact[]>;
    findById(id: number): Promise<Contact | null>;
    findUserByName(name: string): Promise<User | null>;
    create(data: CreateContact): Promise<Contact>;
}

export interface ContactsControllerContract {
    getAll: (
        req: Request<object, Contact[]>, 
        res: Response<Contact[]>,
        next: NextFunction,
    ) => void;

    getContactById: (
        req: Request<{ id: string }, Contact>,   
        res: Response<Contact>,
        next: NextFunction,
    ) => void;

    create: (
        req: Request<                           
            object,
            Contact,
            { localName: string; avatar?: null; contactUserId: string }
        >,
        res: Response<Contact>,
        next: NextFunction,
    ) => void;
}

export interface ContactsServiceContract {
    getAll: (userId: number) => Promise<Contact[]>;

    getContactById: (
        id: number,
        ownerId: number,
    ) => Promise<Contact | null>;

    create: (
        localName: string,
        contactUserId: number,
        ownerId: number,
		avatar?: string
    ) => Promise<Contact>;
}