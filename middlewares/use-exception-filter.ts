import { Request, Response, NextFunction } from 'express'

/**
 * Function signature for an any function
 */
type AnyFunc = (...args: any[]) => any | Promise<any>

/**
 * Catches all errors and forwards it to the the central error handler
 * @param fn any function
 * @returns an express request handler with error handling built in
 */
export const useExceptionFilter =
	(fn: AnyFunc) => (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next)
