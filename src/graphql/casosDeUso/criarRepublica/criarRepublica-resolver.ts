import { Input } from '~/graphql/schema'
import { CriarRepublicaInput, ResponsePayload } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    criarRepublica: async (_, { input }: Input<CriarRepublicaInput>, { repositories, user }: Context): Promise<ResponsePayload> => {
      const { Republica } = repositories.mongoose.models
      try {
        await Republica.create({ ...input, uid: user })
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
