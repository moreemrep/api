import { queryBuilder } from './queryBuilder'
import { CriarRepublicaInput, Tipo } from '../src/generated/graphql'

const query = queryBuilder<CriarRepublicaInput>(`
mutation ($input: CriarRepublicaInput!){
  payload: criarRepublica (input: $input){
    republica {
      id
      nome
    }
    error
    success
  }
}
`)

describe('test somar', () => {
  it('deve somar 5 e 7', () => {
    query.variables = {
      input: {
        descricao: 'test',
        disponivel: true,
        endereco: 'asd',
        localizacao: {
          latitude: 2.3,
          longitude: 3.3
        },
        mostrarNoMapa: true,
        nome: 'asds',
        tipo: Tipo.Feminina
      }
    }
    return global.request()
      .set('token', global.token.unregistered)
      .send(query)
      .expect(res => expect(res.body.data.payload.republica.nome).toBe('asds'))
  })
})
