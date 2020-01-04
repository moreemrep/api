import app from './src/app'
import { createServer } from 'http'
import apollo from './src/apollo'

const PORT = process.env.PORT || 3000

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
