// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Test } from 'supertest'
import { Input } from '~/graphql/schema'

export {}

declare global {
  namespace NodeJS {
    interface Global {
      request: () => Test;
      token: {
        registered: string;
        unregistered: string;
      };
    }
  }
}

export interface Query<T> {
  query: string;
  variables?: Input<T>;
}
