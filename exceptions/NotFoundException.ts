import HttpException from './HttpException'

/**
 * Exception for ForbiddenException
 */
export class NotFoundException extends HttpException {
	constructor(message?: string) {
		super(message)
	}
}
