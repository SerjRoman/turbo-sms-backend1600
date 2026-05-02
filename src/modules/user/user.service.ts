import { StringValue } from "ms";
import { compare, hash } from "bcryptjs";
import {
	AuthenticationError,
	ConflictError,
	NotFoundError,
} from "../../errors/app.errors";
import { UserServiceContract } from "./types/user.contracts";
import { UserRepository } from "./user.repository";
import { sign } from "jsonwebtoken";
import { env } from "../../config/env";

export const UserService: UserServiceContract = {
	async login(dto) {
		const user = await UserRepository.findByEmailWithPassword(dto.email);
		if (!user) {
			throw new NotFoundError("User");
		}
		const isMatched = await compare(dto.password, user.password);
		if (!isMatched) {
			throw new AuthenticationError("Passwords do not match");
		}
		const token = sign({ id: user.id }, env.SECRET_KEY, {
			expiresIn: env.TOKEN_TTL as StringValue,
		});

		return { token };
	},
	async register(dto) {
		const existingUser = await UserRepository.findByEmail(dto.email);
		if (existingUser) {
			throw new ConflictError("User with such email");
		}
		const hashedPassword = await hash(dto.password, 10);
		const createdUser = await UserRepository.create({
			...dto,
			password: hashedPassword,
			avatar: dto.avatar || null,
		});
		const token = sign({ id: createdUser.id }, env.SECRET_KEY, {
			expiresIn: env.TOKEN_TTL as StringValue,
		});

		return { token };
	},
	async me(dto) {
		const user = await UserRepository.findById(dto.userId);
		if (!user) {
			throw new NotFoundError("User");
		}
		return user;
	},
	async findByUsername({ username }) {
		const user = await UserRepository.findByUsername(username);
		if (!user) {
			throw new NotFoundError("User");
		}
		return user;
	},
};
