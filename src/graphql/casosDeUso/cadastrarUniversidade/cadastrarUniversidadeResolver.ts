import { Context } from '~/apollo'
import { Input } from '~/graphql/schema'
import { ResponsePayload, CriarUniversidadeInput } from '~/generated/graphql'

exports.resolver = {
  Mutation: {
    criarUniversidade: async (_, { input }: Input<CriarUniversidadeInput>, { repositories }: Context): Promise<ResponsePayload> => {
      const { Universidade } = repositories.mongoose.models
      try {
        await Universidade.create({ nome: input.nome, sigla: input.sigla, localizacao: { type: 'Point', coordinates: input.localizacao } })
        return {
          success: true
        }
      } catch (err) {
        return {
          success: false,
          error: err.message
        }
      }
    }
  }
}
