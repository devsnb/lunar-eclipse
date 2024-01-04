import HttpException from './HttpException'

/**
 * Exception for ForbiddenException
 */
export class ForbiddenException extends HttpException {
	constructor(message?: string) {
		super(message)
	}
}
