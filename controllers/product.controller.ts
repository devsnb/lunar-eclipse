import { Request, Response } from 'express'
import { useExceptionFilter } from '@/middlewares'
import { createNewProduct } from '@/services/product.service'
import { CreateProductSchema, CreateProductType } from '@/schema/product.schema'
import serialize from '@/common/serialize'
import { BadRequestException } from '../exceptions'

/**
 * create a new product
 */
export const createProduct = useExceptionFilter(
	async (req: Request, res: Response) => {
		const { data, errors } = await serialize<CreateProductType>(
			CreateProductSchema,
			req.body
		)

		if (!data) {
			throw new BadRequestException(undefined, errors)
		}

		const product = await createNewProduct(data)

		res.status(201).json(product)
	}
)
