import { exportFolder } from '../packages/folder-utils'
import { FirebaseService } from './firebase-service'

const services: Services = exportFolder(__dirname, '-service', { mode: process.env.NODE_ENV === 'production' ? 'js' : 'ts' })

export interface Services {
  firebase: FirebaseService;
  redis: any;
}

export { services }
