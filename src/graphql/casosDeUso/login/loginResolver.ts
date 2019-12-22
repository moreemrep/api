import { LoginPayload, ResponsePayload } from '~/generated/graphql'
import { Context } from '~/apollo'

exports.resolver = {
  Mutation: {
    login: async (_, params, { repositories, user }: Context): Promise<LoginPayload | ResponsePayload> => {
      const { Republica } = repositories.mongoose.models
      try {
        const republica = await Republica.findOne({ _id: user })

        if (!republica) throw new Error('republica nao encontrada')

        return {
          success: true,
          republica: {
            id: republica._id,
            localizacao: {
              latitude: republica.localizacao.coordinates[1],
              longitude: republica.localizacao.coordinates[0]
            },
            disponivel: republica.disponivel,
            endereco: republica.endereco,
            mostrarNoMapa: republica.mostrarNoMapa,
            nome: republica.nome,
            tipo: republica.tipo,
            descricao: republica.descricao
          }
        }
      } catch (e) {
        return {
          error: e.message,
          success: false
        }
      }
    }
  }
}
