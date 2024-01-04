export type CustomError = {
	[key: string]: string | undefined
} | null

export default class HttpException extends Error {
	errors?: CustomError
	constructor(message?: string, errors?: CustomError) {
		super(message)
		this.errors = errors
	}
}
