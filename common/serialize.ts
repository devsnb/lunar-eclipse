import { AnyZodObject, ZodEffects } from 'zod'
import logger from '@/common/logger'

type SerializerResultType<T> = {
	data: T | null
	errors: { [key: string]: string | undefined } | null
}

/**
 * Parse and verify the structure and integrity of an object
 * @param schema any zod schema
 * @param actual the actual object to verify
 * @param safeParse  if we want to safeParse default is true
 * @returns an array with the first argument as result and second argument as error
 */
const serialize = async <T>(
	schema: AnyZodObject | ZodEffects<AnyZodObject>,
	actual: Object,
	safeParse: boolean = true
): Promise<SerializerResultType<T>> => {
	try {
		if (!safeParse) {
			const result = await schema.parseAsync(actual)

			// return [result as T, null]
			return { data: result as T, errors: null }
		} else {
			const result = await schema.safeParseAsync(actual)

			if (!result.success) {
				const formattedErrors = result.error.format()

				const keys = Object.keys(formattedErrors)

				const errors: { [key: string]: string | undefined } = {}

				for (let key of keys) {
					if (key === '_errors') {
						continue
					}

					errors[key] = formattedErrors[key]?._errors.join(', ')
				}

				// return [null, errors]
				return { data: null, errors }
			}

			// return [result.data as T, null]
			return { data: result.data as T, errors: null }
		}
	} catch (error) {
		logger.error(error)
		// return [null, { failedSerialization: 'failed to serialize input' }]
		return { data: null, errors: {} }
	}
}

export default serialize
