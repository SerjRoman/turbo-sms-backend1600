// import { Contact, CreateContact } from "./contact.types";
// import { Request, Response, NextFunction } from "express";

// export interface ContactControllerContract {
// 	getAll(
// 		req: Request<object, Contact[], object, object>,
// 		res: Response<Contact[]>,
// 		next: NextFunction,
// 	): Promise<void>;
// 	getContactById(
// 		req: Request<{ id: number }, Contact, object, object>,
// 		res: Response<Contact>,
// 		next: NextFunction,
// 	): Promise<void>;
// 	createContact(
// 		req: Request<object, Contact, { data: CreateContact }, object>,
// 		res: Response<Contact>,
// 		next: NextFunction,
// 	): Promise<void>;
// }

// export interface ContactRepositoryContract {
// 	findAll(ownerId: number): Promise<Contact[]>;
// 	findById(id: number): Promise<Contact | null>;
// 	create(data: CreateContact): Promise<Contact>;
// }

// export interface ContactServiceContract {
// 	findAll(ownerId: number): Promise<Contact[]>;
// 	findById(id: number): Promise<Contact>;
// 	create(data: CreateContact): Promise<Contact>;
// }
