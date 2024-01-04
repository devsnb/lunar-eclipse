import { Request, Response, NextFunction } from 'express'
import logger from '@/common/logger'
import { BadRequestException, ForbiddenException } from '@/exceptions'

const HTTPErrorMessages: { [key: number]: string } = {
	400: 'Bad Request! Please check your inputs',
	401: 'Unauthorized! You cannot access this resource',
	403: 'Forbidden! You do not have the permission to access this resource',
	404: 'Not FOund! Requested resource could not be found',
	500: 'Internal Server Error!'
}

export const ExceptionHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.warn('caught in error handler')
	logger.error(err)

	let status = 500
	let message: string | undefined
	let errors: any

	if (err instanceof BadRequestException) {
		status = 400
		errors = err.errors
		message = err.message
	} else if (err instanceof ForbiddenException) {
		status = 403
		message = err.message
	}

	if (!message) {
		message = HTTPErrorMessages[status]
	}

	return res.status(status).json({
		message,
		errors
	})
}
