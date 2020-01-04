import { queryBuilder } from './queryBuilder'
import { CODES } from '../src/error'

const query = queryBuilder(`
mutation {
  payload: login {
    republica {
      nome
    }
    error
  }
}
`)

describe('teste login', () => {
  it('deve realizer login', () => {
    return global.request()
      .set('token', global.token.registered)
      .send(query)
      .expect(res => expect(res.body.data.payload.republica.nome).toBe('test'))
  })

  it('deve dar error nao autenticado', () => {
    return global.request()
      .send(query)
      .expect(res => expect(res.body.errors[0].message).toBe(CODES.UNAUTHENTICATED))
  })
})
