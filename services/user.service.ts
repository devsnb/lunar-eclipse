import prisma from '@/lib/prisma'
import logger from '@/common/logger'
import { User } from '@prisma/client'

/**
 * Finds user by the provided id
 * @param id the userId
 * @returns the found user of null
 */
export const getUserById = async (id: string): Promise<User | null> => {
	try {
		return await prisma.user.findUnique({
			where: {
				id
			}
		})
	} catch (error) {
		logger.error(error)
		return null
	}
}

/**
 * Finds user by the provided email
 * @param email the email of the user
 * @returns the found user or null
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		return await prisma.user.findUnique({
			where: {
				email
			}
		})
	} catch (error) {
		logger.error(error)
		return null
	}
}
