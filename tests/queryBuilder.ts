import { Query } from './global'

export function queryBuilder<T> (query: string): Query<T> {
  return {
    query
  }
}
