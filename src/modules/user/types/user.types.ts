import { InferType } from "yup";
import { Prisma } from "../../../generated/prisma";
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{ omit: { password: true } }>;
export type UserWithPassword = Prisma.UserGetPayload<{}>;
export type UserCreateInput = Prisma.UserUncheckedCreateInput;

// DTO - Data Transfer Object
export type LoginCredentials = InferType<typeof loginSchema>;
export type RegisterCredentials = InferType<typeof regSchema>;
export type MeDTO = {
    userId: number
}