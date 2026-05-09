export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;

export interface JoinChatPayload {
	chatId: number;
}

export interface LeaveChatPayload {
	chatId: number;
}

export interface ChatClientEvents {
	joinChat: (payload: JoinChatPayload, ack?: JoinChatCallback) => void;
	leaveChat: (payload: LeaveChatPayload) => void;
}
/*
    acknowledgment(ack) - это функция, 
    которая может быть вызвана на стороне сервера для отправки подтверждения обратно клиенту после обработки события.
    Когда клиент отправляет событие на сервер, он может передать функцию обратного вызова в качестве аргумента. 
    Эта функция будет вызвана сервером после обработки события, и в нее можно передать данные или статус выполнения.
*/
