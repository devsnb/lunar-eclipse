import { z } from 'zod'

const SEX = ['MALE', 'FEMALE', 'OTHERS', 'PREFER_NOT_TO_SAY'] as const

export const RegisterUserSchema = z.object({
	name: z
		.string()
		.min(2, 'name must be at least 2 characters')
		.max(32, 'name cannot exceed 32 characters'),
	email: z
		.string()
		.min(1, 'email cannot be empty')
		.email('email must be a valid email'),
	password: z
		.string()
		.min(8, 'password must be at least 8 characters')
		.max(32, 'password cannot exceed 32 characters'),
	dob: z.coerce.date({ invalid_type_error: 'dob must be a valid date' }),
	sex: z.enum(SEX).default('PREFER_NOT_TO_SAY')
})

export type RegisterUserType = z.infer<typeof RegisterUserSchema>

export const LoginUserSchema = z.object({
	email: z
		.string()
		.min(1, 'email cannot be empty')
		.email('email must be a valid email'),
	password: z
		.string()
		.min(8, 'password must be at least 8 characters')
		.max(32, 'password cannot exceed 32 characters')
})

export type LoginUserType = z.infer<typeof LoginUserSchema>

export const UpdatePasswordSchema = z.object({
	email: z
		.string()
		.min(1, 'email cannot be empty')
		.email('email must be a valid email'),
	currentPassword: z
		.string()
		.min(8, 'password must be at least 8 characters')
		.max(32, 'password cannot exceed 32 characters'),
	newPassword: z
		.string()
		.min(8, 'password must be at least 8 characters')
		.max(32, 'password cannot exceed 32 characters')
})

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>
