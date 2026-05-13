import { Prisma } from "../../../generated/prisma";

export type Message = Prisma.MessageGetPayload<{}>;
export type MessageCreate = Prisma.MessageUncheckedCreateInput;

export type SendMessageDto = {
	senderId: number;
	text?: string;
	mediaUrl?: string;
	chatId: number;
	type: "text" | "media";
};

export interface SendMessagePayload {
	text?: string;
	mediaUrl?: string;
	chatId: number;
	type: "text" | "media";
}
