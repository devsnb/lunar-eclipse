import { NextFunction, Request, Response } from 'express'
import { useExceptionFilter } from './use-exception-filter'
import { UnauthorizedException } from '@/exceptions'

type Role = 'MEMBER' | 'ADMIN'

type Options = {
	allowedRoles: Role[]
}

export const authorize = (options?: Options) => {
	return useExceptionFilter(
		async (req: Request, res: Response, next: NextFunction) => {
			if (!req.user) {
				throw new UnauthorizedException()
			}

			if (!options?.allowedRoles) {
				return next()
			}

			if (!options.allowedRoles.includes(req.user.role)) {
				throw new UnauthorizedException()
			}

			next()
		}
	)
}
