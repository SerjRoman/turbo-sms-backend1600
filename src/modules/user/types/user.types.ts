import { InferType } from "yup";
import { Prisma } from "../../../generated/prisma";
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{ omit: { password: true } }>;
export type UserWithPassword = Prisma.UserGetPayload<{}>;
export type UserCreateInput = Prisma.UserUncheckedCreateInput;

// DTO - Data Transfer Object
export type MeDTO = {
	userId: number;
};
// DRY - don't repeat yourself

export type RegisterDto = {
	email: string;
	password: string;
	name: string;
	surname: string;
	username: string;
	avatar?: string | undefined;
};
export type LoginDto = {
	email: string;
	password: string;
};

export type LoginCredentials = InferType<typeof loginSchema>;
export type RegisterCredentials = InferType<typeof regSchema>;
export type FindByUsernameDto = { username: string };
