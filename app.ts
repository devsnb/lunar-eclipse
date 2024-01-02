import express, { Express, Request, Response } from 'express'

const app: Express = express()

app.get('/', (_: Request, res: Response) => {
	// res.send('Express + TypeScript Server!!')
})

export default app
