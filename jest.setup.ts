import { services } from './src/services'
import { repositories } from './src/repositories'
import app from './src/app'
import { Connection } from 'mongoose'
import { Server } from 'http'
import { Tipo } from './src/generated/graphql'

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

beforeEach(async () => {
  await mongoose.models.Republica.create({
    uid: '123',
    email: 'test@test.com',
    descricao: 'test',
    disponivel: true,
    endereco: 'asd',
    localizacao: {
      type: 'Point',
      coordinates: [2.4, 2.2]
    },
    mostrarNoMapa: true,
    nome: 'test',
    tipo: Tipo.Feminina
  })
})

afterEach(async () => {
  await redis.flushall()
  return connection.dropDatabase()
})

afterAll(async () => {
  await connection.close()
  await redis.quit()
  return instance.close()
})
