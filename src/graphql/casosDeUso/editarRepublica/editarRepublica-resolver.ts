import { Input } from '~/graphql/schema'
import { EditarRepublicaInput, ResponsePayload } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    editarRepublica: async (_, { input }: Input<EditarRepublicaInput>, { repositories, user }: Context): Promise<ResponsePayload> => {
      const { Republica } = repositories.mongoose.models
      try {
        await Republica.updateOne({
          _id: user
        },
        {
          ...input,
          localizacao: {
            type: 'Point',
            coordinates: [input.localizacao.longitude, input.localizacao.latitude]
          }
        }
        )
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
