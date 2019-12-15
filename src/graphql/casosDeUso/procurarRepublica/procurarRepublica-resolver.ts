import { Input } from '~/graphql/schema'
import { ProcurarRepublicaInput, ProcurarRepublicaPayload } from '~/generated/graphql'
import { Context } from '~/apollo'

function toRad (Value) {
  return Value * Math.PI / 180
}

function calcCrow (lat1, lon1, lat2, lon2) {
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  lat1 = toRad(lat1)
  lat2 = toRad(lat2)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

exports.resolver = {
  Mutation: {
    procurarRepublica: async (_, { input }: Input<ProcurarRepublicaInput>, { repositories }: Context): Promise<ProcurarRepublicaPayload> => {
      const { Republica, Universidade } = repositories.mongoose.models

      try {
        // todo: filtrar
        const universidade = await Universidade.findOne({ _id: input.universidade }, { localizacao: 1 })

        if (!universidade) throw new Error('universidade não encontrada')
        const republicas = await Republica.find(
          {
            localizacao: {
              $geoWithin: {
                $centerSphere: [universidade.localizacao.coordinates, input.distancia / 1609.34 / 3963.2]
              }
            },
            tipo: input.tipo
          }
        )
        return {
          success: true,
          republicas: republicas.map(republica => ({
            distancia: calcCrow(republica.localizacao.coordinates[1], republica.localizacao.coordinates[0], universidade.localizacao.coordinates[1], universidade.localizacao.coordinates[0]),
            nome: republica.nome,
            descricao: republica.descricao,
            localizacao: republica.mostrarNoMapa ? republica.localizacao.coordinates : []
          })),
          centro: universidade.localizacao.coordinates
        }
      } catch (err) {
        return {
          success: false,
          error: err.message,
          republicas: [],
          centro: []
        }
      }
    }
  }
}
