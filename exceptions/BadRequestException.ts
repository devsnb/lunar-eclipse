import HttpException, { CustomError } from './HttpException'

/**
 * Exception for BadRequest
 */
export class BadRequestException extends HttpException {
	constructor(message?: string, errors?: CustomError) {
		super(message, errors)
	}
}
