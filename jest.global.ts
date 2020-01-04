import request from 'supertest'
import app from './src/app'
import jwt from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
global.request = () => request(app).post('/graphql')

global.token = {
  registered: jwt.sign({ uid: '123', email: 'test@test.com' }, 'sh'),
  unregistered: jwt.sign({ uid: '1s', email: 'test@yest.com' }, 'sh')
}
