import app from '@/app'
import config from '@/config'
import logger from '@/utils/logger'

const main = async () => {
	const port = config.get('port')

	app.listen(port, () => {
		logger.info(`Server is running at http://localhost:${port}`)
	})
}

main()
