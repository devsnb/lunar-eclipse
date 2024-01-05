import { Router } from 'express'
import { createProduct } from '@/controllers/product.controller'
import { useAuthentication, authorize } from '@/middlewares'

const productRoutes = Router()

productRoutes.post(
	'/create',
	useAuthentication(),
	authorize({ allowedRoles: ['ADMIN'] }),
	createProduct
)

export default productRoutes
