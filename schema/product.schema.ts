import { z } from 'zod'

export const CreateProductSchema = z
	.object({
		name: z.string().min(3).max(32),
		description: z.string().min(3).max(200),
		hsn: z.number().int().optional(),
		mrp: z.number(),
		sellingPrice: z.number().optional(),
		available: z.boolean(),
		rating: z.number().default(0).optional(),
		availableUnits: z.number().int(),
		photos: z.array(z.string()).max(10).optional()
	})
	.refine(
		({ sellingPrice, mrp }) => {
			if (!sellingPrice) {
				return true
			}

			if (sellingPrice > mrp) {
				return false
			}

			return true
		},
		{
			message: 'selling price cannot exceed mrp',
			path: ['sellingPrice']
		}
	)

export type CreateProductType = z.infer<typeof CreateProductSchema>
