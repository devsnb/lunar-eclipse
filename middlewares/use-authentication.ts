import { Request, Response, NextFunction } from 'express'
import { useExceptionFilter } from './use-exception-filter'
import { verifyJwt } from '@/services/jwt.service'
import { UnauthorizedException } from '@/exceptions'
import { getUserById } from '@/services/user.service'
import { User } from '@prisma/client'
import logger from '@/common/logger'

type AuthenticationOptions = {
	failedPassthrough: boolean
}

/**
 * Validates the incoming request & attaches the user object to the incoming request
 * @param opts options for using authentication
 */
export const useAuthentication = (opts?: AuthenticationOptions) =>
	useExceptionFilter(
		async (req: Request, res: Response, next: NextFunction) => {
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				if (opts?.failedPassthrough) {
					return next()
				} else {
					logger.warn('no bearer token found')
					throw new UnauthorizedException('no authentication provided')
				}
			}

			const payload = verifyJwt(token)
			const userId = payload.sub

			if (!userId) {
				logger.warn('jwt payload has no subject')
				throw new UnauthorizedException(
					'no subject found in authentication found'
				)
			}

			const user = await getUserById(userId)

			if (!user) {
				logger.warn('no user found with the payload subject')
				throw new UnauthorizedException('invalid authentication token')
			}

			req.user = user
			next()
		}
	)

// add the user object in the express request
// helps with typescript
declare global {
	namespace Express {
		export interface Request {
			user?: User
		}
	}
}
