import { Request, Response } from 'express'
import { useExceptionFilter } from '@/middlewares'
import serialize from '@/common/serialize'
import { RegisterUserSchema, RegisterUserType } from '@/schema/user.schema'
import { signUp } from '@/services/auth.service'
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
