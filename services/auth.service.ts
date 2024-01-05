import * as argon from 'argon2'
import prisma from '@/lib/prisma'
import { RegisterUserType, LoginUserType } from '@/schema/auth.schema'
import {
	BadRequestException,
	ForbiddenException,
	NotFoundException
} from '@/exceptions'
import { signJwt } from '@/services/jwt.service'

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

/**
 * Verifies a user based on provided email & password
 * @param user input having the email & password of the user
 * @returns the found user
 */
export const signIn = async (user: LoginUserType) => {
	const foundUser = await prisma.user.findUnique({
		where: {
			email: user.email
		}
	})

	if (!foundUser) {
		throw new NotFoundException('no user exists with the provided email')
	}

	const passwordsMatch = await argon.verify(foundUser.password, user.password)

	if (!passwordsMatch) {
		throw new BadRequestException('check your inputs & try again')
	}

	const jwtPayload = {
		email: foundUser.email,
		role: foundUser.role
	}

	const jwt = signJwt(foundUser.id, jwtPayload)

	return jwt
}
