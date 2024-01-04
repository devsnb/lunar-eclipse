import * as argon from 'argon2'
import prisma from '@/lib/prisma'
import { RegisterUserType } from '@/schema/user.schema'
import { ForbiddenException } from '@/exceptions'

/**
 * User sign up handler
 * @param user object with required data for user registration
 * @returns the new user object
 */
export const signUp = async (user: RegisterUserType) => {
	// look for existing user with provided email
	const foundUser = await prisma.user.findUnique({
		where: {
			email: user.email
		}
	})

	// if user already exists throw exception
	if (foundUser) {
		throw new ForbiddenException(
			'You do not have permission to perform this operation'
		)
	}

	// hash the user password
	const passwordHash = await argon.hash(user.password)

	// create a new entry in the database with provided data
	const createdUser = await prisma.user.create({
		data: {
			name: user.name,
			email: user.email,
			dob: user.dob,
			password: passwordHash,
			sex: user.sex
		}
	})

	// return the newly created user
	return createdUser
}
