import type { Request, Response, NextFunction } from "express";
import type {
	FindByUsernameDto,
	GetOnlineUsersAcknowledgment,
	GetOnlineUsersPayload,
	GetUserStatusAcknowledgment,
	LoginCredentials,
	LoginDto,
	MeDTO,
	RegisterCredentials,
	RegisterDto,
	SubscribeAndGetInitialStatusesAcknowledgment,
	SubscribeAndGetInitialStatusesPayload,
	User,
	UserCreateInput,
	UserWithPassword,
} from "./user.types";
import type { AuthenticatedUser } from "../../../types/token.types";
import type {
	ClientSocket,
	ServerSocket,
	SocketController,
} from "../../../socket/socket.types";

export interface UserServiceContract {
	login: (dto: LoginDto) => Promise<{ token: string }>;
	register: (dto: RegisterDto) => Promise<{ token: string }>;
	me: (dto: MeDTO) => Promise<User>;
	findByUsername: (dto: FindByUsernameDto) => Promise<User>;
	updateLastSeenAt: (userId: number) => Promise<User>;
}
export interface UserRepositoryContract {
	findByEmailWithPassword: (
		email: string,
	) => Promise<UserWithPassword | null>;
	findByEmail: (email: string) => Promise<User | null>;
	create: (data: UserCreateInput) => Promise<User>;
	findById: (id: number) => Promise<User>;
	findByUsername: (username: string) => Promise<User | null>;
	updateLastSeenAt: (userId: number) => Promise<User>;
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

export interface UserSocketControllerContract extends SocketController {
	subscriptionsMap: Map<number, Set<number>>;
	getOnlineUsers: (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: GetOnlineUsersPayload,
		ack?: GetOnlineUsersAcknowledgment,
	) => void;
	isUserOnline: (ioServer: ServerSocket, id: number) => boolean;
	subscribeAndGetInitialStatuses: (
		ioServer: ServerSocket,
		socket: ClientSocket,
		payload: SubscribeAndGetInitialStatusesPayload,
		ack?: SubscribeAndGetInitialStatusesAcknowledgment,
	) => void;
	notifySubscribedUsers: (
		ioServer: ServerSocket,
		userId: number,
		status: "online" | "offline",
	) => void;
	getUserStatus: (
		ioServer: ServerSocket,
		userId: number,
		ack?: GetUserStatusAcknowledgment,
	) => void;
	updateLastSeenAt: (
		userId: number
	) => void;
}
