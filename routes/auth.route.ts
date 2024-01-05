import { Router } from 'express'
import { register, login, changePassword } from '@/controllers/auth.controller'
import { useAuthentication } from '@/middlewares'

const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/change-password', useAuthentication(), changePassword)

export default authRoutes
