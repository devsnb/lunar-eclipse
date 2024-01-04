import { sub, isBefore } from 'date-fns'

/**
 * Checks the minimum age
 * @param dob the date of birth
 * @param min minimum age in years
 * @returns true if over min age otherwise returns false
 */
export const isMinAge = (dob: Date, min: number) => {
	const age = sub(new Date(), { years: min })

	if (isBefore(dob, age)) {
		return true
	}

	return false
}
