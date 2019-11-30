import express from 'express'
import { createServer } from 'http'
import apolloServer from './apollo'
import { schema } from './graphql/schema'

const app = express()

app.get('/graphql/schema', (req, res) => res.send(schema.typeDefs))

apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

export default httpServer
