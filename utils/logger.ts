import chalk from 'chalk'
import { Logger, createLogger, format, transports } from 'winston'
import config from '@/config'

const { combine, timestamp, errors, printf, json } = format

/**
 * Custom formatter for console
 */
const consoleFormat = combine(
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	errors({ stack: true }),
	printf(({ level, message, timestamp, stack }) => {
		// set colors based on the log levels
		switch (level) {
			case 'error': {
				level = `${chalk.bgRedBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.redBright(message)
				stack = chalk.redBright(stack)
				break
			}
			case 'warn': {
				level = `${chalk.bgYellowBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.yellowBright(message)
				break
			}
			case 'info': {
				level = `${chalk.bgCyanBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.cyanBright(message)
				break
			}
			case 'http': {
				level = `${chalk.bgGreenBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.greenBright(message)
				break
			}
			case 'verbose': {
				level = `${chalk.bgWhiteBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.whiteBright(message)
				break
			}
			case 'debug': {
				level = `${chalk.bgMagentaBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.magentaBright(message)
				break
			}
			case 'silly': {
				level = `${chalk.bgGray.bold(`[${level}]`.toUpperCase())}`
				message = chalk.gray(message)
				break
			}
			default: {
				level = `${chalk.bgWhiteBright.bold(`[${level}]`.toUpperCase())}`
				message = chalk.white(message)
				break
			}
		}

		return `[${chalk.green.bold(timestamp)}] ${level}: ${stack || message}`
	})
)

/**
 * Custom json formatter for saving logs to file
 */
const fileFormat = combine(
	timestamp(),
	errors({ stack: true }),
	json({ space: 4 })
)

/**
 * Logger instance
 */
const logger: Logger = createLogger({
	format: combine(errors({ stack: true }), json({ space: 4 })),
	transports: [
		new transports.Console({
			format: consoleFormat,
			level: config.get('logger.logLevel')
		}),
		new transports.File({
			format: fileFormat,
			filename: config.get('logger.fileName'),
			level: config.get('logger.logLevel')
		})
	]
})

export default logger
