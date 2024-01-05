import prisma from '@/lib/prisma'
import { CreateProductType } from '@/schema/product.schema'

/**
 * Create a new product
 * @param product
 * @returns the newly created product
 */
export const createNewProduct = async (product: CreateProductType) => {
	const newProduct = await prisma.product.create({
		data: {
			name: product.name,
			description: product.description,
			available: product.available,
			availableUnits: product.availableUnits,
			mrp: product.mrp,
			sellingPrice: product?.sellingPrice,
			rating: product?.rating,
			hsn: product?.hsn,
			photos: product?.photos
		}
	})

	return newProduct
}
