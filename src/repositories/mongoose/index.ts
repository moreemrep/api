import { requireFolder } from '../../packages/folder-utils'
import { RepublicaModel } from './republica-model'
// import { PageInfo } from '../../generated/graphql'
import { PageInput } from '../../graphql/schema'
import { UniversidadeModel } from './universidade-model';

const inject = mongoose => requireFolder(__dirname, '-model', { mode: process.env.NODE_ENV === 'production' ? 'js' : 'ts', inject: mongoose })

export default inject

export interface MongooseModels {
  Republica: RepublicaModel;
  Universidade: UniversidadeModel;
}

interface Connection {
  edges: [Edge];
  // pageInfo: PageInfo;
}

interface Edge {
  cursor: string;
  node: {
    id: string;
  };
}

export interface RelayPagination<T> {
  getPage: (input: GetPageInput) => Connection;
}

interface GetPageInput extends PageInput {
  params: object;
}
