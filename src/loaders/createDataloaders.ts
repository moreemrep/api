import { Repositories } from '~/repositories'
import Dataloader from 'dataloader'
import { RepublicaDocument } from '~/repositories/mongoose/republica-model'
import { Model, Document } from 'mongoose'
import { UniversidadeDocument } from '~/repositories/mongoose/universidade-model'

function Loader<T extends Document> (model: Model<T>): Dataloader<string, T> {
  return new Dataloader(async ids => (
    await model.find({ _id: { $in: ids } })
  ).sort((a, b) =>
    ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  ),
  {
    cacheKeyFn: key => key.toString()
  })
}

export function createDataloaders (repositories: Repositories): Loaders {
  const { Republica, Universidade } = repositories.mongoose.models

  return {
    republica: Loader<RepublicaDocument>(Republica),
    universidade: Loader<UniversidadeDocument>(Universidade)
  }
}

export interface Loaders {
  republica: Dataloader<string, RepublicaDocument>;
  universidade: Dataloader<string, UniversidadeDocument>;
}
