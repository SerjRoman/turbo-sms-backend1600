import { Request, Response, NextFunction } from "express";
import type {
	FindByUsernameDto,
	LoginCredentials,
	LoginDto,
	MeDTO,
	RegisterCredentials,
	RegisterDto,
	User,
	UserCreateInput,
	UserWithPassword,
} from "./user.types";
import { AuthenticatedUser } from "../../../types/token.types";

export interface UserServiceContract {
	login: (dto: LoginDto) => Promise<{ token: string }>;
	register: (dto: RegisterDto) => Promise<{ token: string }>;
	me: (dto: MeDTO) => Promise<User>;
	findByUsername: (dto: FindByUsernameDto) => Promise<User>;
}
export interface UserRepositoryContract {
	findByEmailWithPassword: (
		email: string,
	) => Promise<UserWithPassword | null>;
	findByEmail: (email: string) => Promise<User | null>;
	create: (data: UserCreateInput) => Promise<User>;
	findById: (id: number) => Promise<User>;
	findByUsername: (username: string) => Promise<User | null>;
}

export interface UserControllerContract {
	login: (
		req: Request<object, { token: string }, LoginCredentials>,
		res: Response<{ token: string }>,
		next: NextFunction,
	) => void;
	register: (
		req: Request<object, { token: string }, RegisterCredentials>,
		res: Response<{ token: string }>,
		next: NextFunction,
	) => void;
	me: (
		req: Request<object, User, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	findByUsername: (
		req: Request<
			{ username: string },
			User,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}
