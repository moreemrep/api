import express from 'express'
import { createServer } from 'http'
import apolloServer from './apollo'
import { schema } from './graphql/schema'

function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, Recaptcha')

  if (req.method === 'OPTIONS') return res.sendStatus(200)

  next()
}

const app = express()

app.use(cors)

app.get('/graphql/schema', (req, res) => res.send(schema.typeDefs))

apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

export default httpServer
