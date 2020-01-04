import { Input } from '~/graphql/schema'
import { CriarRepublicaInput, CriarRepublicaPayload } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    criarRepublica: async (_, { input }: Input<CriarRepublicaInput>, { repositories, token, services }: Context): Promise<CriarRepublicaPayload> => {
      const { Republica } = repositories.mongoose.models
      const { firebase } = services
      try {
        if (!token) throw new Error('sem token')
        const { email, uid } = await firebase.verifyIdToken(token)

        const republica = await Republica.create({
          ...input,
          email,
          uid,
          localizacao: {
            type: 'Point',
            coordinates: [input.localizacao.longitude, input.localizacao.latitude]
          }
        })
        return {
          success: true,
          republica: {
            id: republica._id,
            localizacao: {
              latitude: republica.localizacao.coordinates[1],
              longitude: republica.localizacao.coordinates[0]
            },
            descricao: republica.descricao,
            disponivel: republica.disponivel,
            endereco: republica.endereco,
            mostrarNoMapa: republica.mostrarNoMapa,
            nome: republica.nome,
            tipo: republica.tipo
          }
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
