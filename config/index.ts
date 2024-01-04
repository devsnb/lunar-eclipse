import convict from 'convict'
import 'dotenv/config'

// application log levels
const logLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']

// application environments
const environments = ['production', 'development', 'test']

const config = convict({
	env: {
		doc: 'The application environment.',
		format: environments,
		default: 'development',
		env: 'NODE_ENV',
		arg: 'NODE_ENV'
	},
	port: {
		doc: 'The port to start the application on',
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
	},
	databaseUrl: {
		doc: 'MongoDB connection URL',
		format: String,
		default: null,
		nullable: true,
		env: 'DATABASE_URL'
	},
	jwt: {
		privateKey: {
			doc: 'Private RSA key to sign the jwt',
			format: String,
			default: 'a-private-key',
			nullable: false,
			env: 'JWT_PRIVATE_KEY'
		},
		publicKey: {
			doc: 'Public RSA key to verify the jwt',
			format: String,
			default: 'a-public-key',
			nullable: false,
			env: 'JWT_PUBLIC_KEY'
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
