import { Request, Response } from 'express'
import { useExceptionFilter } from '@/middlewares'
import serialize from '@/common/serialize'
import {
	LoginUserSchema,
	LoginUserType,
	RegisterUserSchema,
	RegisterUserType
} from '@/schema/user.schema'
import { signUp, signIn } from '@/services/auth.service'
import { BadRequestException } from '@/exceptions'
import { isMinAge } from '@/lib/dates'

/**
 * Registers a new user in the system
 */
export const register = useExceptionFilter(
	async (req: Request, res: Response) => {
		const { data, errors } = await serialize<RegisterUserType>(
			RegisterUserSchema,
			req.body
		)

		if (!data) {
			throw new BadRequestException(
				'Please check your inputs & try again',
				errors
			)
		}

		if (!isMinAge(data.dob, 18)) {
			throw new BadRequestException('Please check your inputs & try again', {
				dob: 'minimum age to register is 18'
			})
		}

		const newUser = await signUp(data)

		res.status(201).json(newUser)
	}
)

/**
 * logins user with a jwt
 */
export const login = useExceptionFilter(async (req: Request, res: Response) => {
	const { data, errors } = await serialize<LoginUserType>(
		LoginUserSchema,
		req.body
	)

	if (!data) {
		throw new BadRequestException(
			'Please check your inputs & try again',
			errors
		)
	}

	const token = await signIn(data)

	return res.status(200).json({ accessToken: token })
})
