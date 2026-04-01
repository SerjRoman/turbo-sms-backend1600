/**
 * AppError - это наш базовый класс для всех кастомных ошибок в приложении.
 * Он наследуется от встроенного в JavaScript класса `Error`.
 *
 * - `extends Error`             : Ключевое слово `extends` означает, что `AppError` наследует все
 *                                   свойства и методы от встроенного класса `Error` (такие как `message` и `stack`).
 */
export class AppError extends Error {
	// `public readonly statusCode: number;` - это синтаксис TypeScript.
	// `public`: свойство доступно извне класса.
	// `readonly`: значение свойства можно установить только в конструкторе, его нельзя изменить позже.
	// `statusCode`: имя свойства.
	// `number`: тип данных для этого свойства.
	public readonly statusCode: number;
	/**
	 * `constructor` - это специальный метод для создания и инициализации объекта,
	 * созданного с помощью класса. Он вызывается автоматически при использовании `new AppError(...)`.
	 *
	 * @param message - Текстовое описание ошибки.
	 * @param code - HTTP-статус код, который соответствует этой ошибке (например, 404, 400).
	 */
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}
export class BadRequestError extends AppError {
	constructor(message: string = "Bad request") {
		super(message, 400);
	}
}
export class NotFoundError extends AppError {
	constructor(resourceName: string) {
		super(`${resourceName} not found`, 404);
	}
}
// 409, 500
export class ConflictError extends AppError {
	constructor(resourceName: string) {
		super(`${resourceName} already exists`, 409);
	}
}
export class ValidationError extends AppError {
	constructor(message: string = "Validation Error") {
		super(message, 422);
	}
}
export class AuthenticationError extends AppError {
	constructor(message: string = "Authentication Error") {
		super(message, 401);
	}
}

export class InternalServerError extends AppError {
	constructor(message: string = "Internal Server Error") {
		super(message, 500);
	}
}
