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

describe('teste criar republica', () => {
  it('deve criar republica asds', () => {
    return global.request()
      .set('token', global.token.unregistered)
      .send(query)
      .expect(res => expect(res.body.data.payload.republica.nome).toBe('asds'))
  })

  it('deve dar error de token faltando', () => {
    return global.request()
      .send(query)
      .expect(res => expect(res.body.data.payload.error).toBe('sem token'))
  })
})
