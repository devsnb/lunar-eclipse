import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import logger from '@/common/logger'
import config from '@/config'

/**
 * Gets the key pair and returns it
 * @returns the key pair
 */
const getKeys = () => {
	try {
		const PRIVATE_KEY = atob(config.get('jwt.privateKey'))
		const PUBLIC_KEY = atob(config.get('jwt.publicKey'))

		return { privateKey: PRIVATE_KEY, publicKey: PUBLIC_KEY }
	} catch (error) {
		logger.warn('failed to parse key pair')
		throw error
	}
}

/**
 * Generates new jwt
 * @param payload payload for jwt
 * @returns the new jwt in string format
 */
export const signJwt = (payload: any): string => {
	try {
		const keys = getKeys()
		const accessToken = jsonwebtoken.sign(payload, keys.privateKey, {
			algorithm: 'RS256',
			expiresIn: '7d'
		})

		return accessToken
	} catch (error) {
		logger.error(error)
		throw new Error('unable to sign JWT')
	}
}

/**
 * Validates jwt
 * @param token the string jwt
 * @returns the payload of the jwt if verification is successful
 */
export const verifyJwt = (token: string): JwtPayload => {
	try {
		const keys = getKeys()
		const payload = jsonwebtoken.verify(token, keys.publicKey, {
			algorithms: ['RS256']
		})

		return payload as JwtPayload
	} catch (error) {
		logger.error(error)
		throw new Error('JWT verification failed')
	}
}
