import { Repositories } from '~/repositories'
import Dataloader from 'dataloader'
import { RepublicaDocument } from '~/repositories/mongoose/republica-model'

export function createDataloaders (repositories: Repositories): Loaders {
  const { Republica } = repositories.mongoose.models

  function Loader<T> (model): Dataloader<string, T[]> {
    return new Dataloader(async ids => (
      await model.find({ _id: { $in: ids } })
    ).sort((a, b) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    ),
    {
      cacheKeyFn: key => key.toString()
    })
  }

  return {
    republica: Loader<RepublicaDocument>(Republica)
  }
}

export interface Loaders {
  republica: Dataloader<string, any>;
}
