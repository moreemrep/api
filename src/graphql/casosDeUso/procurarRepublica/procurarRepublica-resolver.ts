import { Input } from '~/graphql/schema'
import { ProcurarRepublicaInput, ProcurarRepublicaPayload } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    procurarRepublica: async (_, { input }: Input<ProcurarRepublicaInput>, { repositories, user }: Context): Promise<ProcurarRepublicaPayload> => {
      const { Republica } = repositories.mongoose.models
      try {
        // todo: filtrar
        const republicas = await Republica.find({}, { nome: 1, descricao: 1 })
        return {
          success: true,
          republicas: republicas.map(republica => ({
            distancia: 10,
            nome: republica.nome,
            descricao: republica.descricao
          }))
        }
      } catch (err) {
        return {
          success: false,
          error: err.message,
          republicas: []
        }
      }
    }
  }
}
