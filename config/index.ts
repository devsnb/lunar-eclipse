import convict from 'convict'

// application log levels
const logLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']

const config = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
		arg: 'NODE_ENV'
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 8080,
		env: 'PORT'
	},
	logger: {
		logLevel: {
			doc: 'Application log level',
			format: logLevels,
			default: 'silly',
			env: 'LOG_LEVEL'
		},
		fileName: {
			doc: 'Name of the file to store the logs',
			format: String,
			default: 'app.log',
			env: 'LOG_FILENAME'
		}
	}
})

const env = config.get('env')

// don't load config file in production, instead load it
// from the system environment (automatic)
if (env !== 'production') {
	config.loadFile('env.' + env + '.json')
}

config.validate({ allowed: 'strict' })

export default config
