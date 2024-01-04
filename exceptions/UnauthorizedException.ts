import HttpException from './HttpException'

/**
 * Exception for UnauthorizedException
 */
export class UnauthorizedException extends HttpException {
	constructor(message?: string) {
		super(message)
	}
}
