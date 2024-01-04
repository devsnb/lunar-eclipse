import express, { Express } from 'express'
import router from '@/routes'
import { ExceptionHandler } from '@/middlewares'

const app: Express = express()

// parse incoming request body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// registering the router
app.use('/api', router)

// registering central error handler
app.use(ExceptionHandler)

export default app
