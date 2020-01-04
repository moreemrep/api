import { services } from './src/services'
import { repositories } from './src/repositories'
import app from './src/app'
import { Connection } from 'mongoose'
import { Server } from 'http'

jest.setTimeout(10000)

const {
  redis
} = services

const {
  mongoose
} = repositories

const connection: Connection = mongoose as any

let instance: Server

beforeAll(() => {
  instance = app.listen()
  return instance
})

afterEach(() => connection.dropDatabase())

afterAll(async () => {
  await connection.close()
  await redis.quit()
  return instance.close()
})
