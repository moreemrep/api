import { LoginPayload } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    login: async (_, params, { repositories, user }: Context): Promise<LoginPayload> => {
      const { Republica } = repositories.mongoose.models
      try {
        const republica = await Republica.findOne({ _id: user })

        if (!republica) throw new Error('republica nao encontrada')

        return {
          success: true,
          republica: {
            ...republica,
            id: republica._id,
            localizacao: republica.localizacao.coordinates
          }
        }
      } catch (e) {
        return {
          error: e.message,
          success: false,
          republica: {
            id: ''
          }
        }
      }
    }
  }
}
