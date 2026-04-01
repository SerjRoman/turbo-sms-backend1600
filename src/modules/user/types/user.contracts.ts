import { Request, Response } from "express";
import type {
	LoginCredentials,
	MeDTO,
	RegisterCredentials,
	User,
	UserCreateInput,
	UserWithPassword,
} from "./user.types";
import { AuthenticatedUser } from "../../../types/token.types";

export interface UserServiceContract {
	login: (credentials: LoginCredentials) => Promise<{ token: string }>;
	register: (
		credentials: RegisterCredentials,
		avatar: string,
	) => Promise<{ token: string }>;
	me: (dto: MeDTO) => Promise<User>;
}
export interface UserRepositoryContract {
	findByEmailWithPassword: (
		email: string,
	) => Promise<UserWithPassword | null>;
	findByEmail: (email: string) => Promise<User | null>;
	create: (data: UserCreateInput) => Promise<User>;
	findById: (id: number) => Promise<User>;
}

export interface UserControllerContract {
	login: (
		req: Request<object, { token: string }, LoginCredentials>,
		res: Response<{ token: string }>,
	) => void;
	register: (
		req: Request<object, { token: string }, RegisterCredentials>,
		res: Response<{ token: string }>,
	) => void;
	me: (
		req: Request<object, User, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
	) => void;
}
