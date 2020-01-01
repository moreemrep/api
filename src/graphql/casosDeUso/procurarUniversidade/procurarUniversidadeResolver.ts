import { Input } from '~/graphql/schema'
import { ProcurarUniversidadePayload, ProcurarUniversidadeInput } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    procurarUniversidade: async (_, { input }: Input<ProcurarUniversidadeInput>, { repositories }: Context): Promise<ProcurarUniversidadePayload> => {
      const { Universidade } = repositories.mongoose.models

      try {
        let universidades
        if (input.sigla) {
          universidades = await Universidade.find({ sigla: new RegExp(input.sigla, 'i') })
        } else if (input.nome) {
          universidades = await Universidade.find({ nome: new RegExp(input.nome, 'i') })
        } else {
          throw new Error('Missing param')
        }

        return {
          success: true,
          universidades
        }
      } catch (err) {
        return {
          success: false,
          error: err.message,
          universidades: []
        }
      }
    }
  }
}
