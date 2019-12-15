import { Mongoose, Document, Model } from 'mongoose'
import { Location } from './republica-model'
const paginationPlugin = require('./plugins/mongoose-plugin-relay-pagination.js')

export interface UniversidadeDocument extends Document {
  nome: string;
  sigla: string;
  localizacao: Location;
}

export type UniversidadeModel = Model<UniversidadeDocument>

module.exports = (mongoose: Mongoose) => {
  const { Schema, model } = mongoose

  const schema = {
    nome: {
      type: String,
      required: true,
      unique: true
    },
    sigla: {
      type: String,
      required: true,
      unique: true
    },
    localizacao: {
      type: { type: String },
      coordinates: [Number]
    }
  }
  const universidadeSchema = new Schema(schema, { timestamps: true })

  universidadeSchema.index({ localizacao: '2dsphere' })

  universidadeSchema.plugin(paginationPlugin)

  universidadeSchema.index({ uid: 'text' }, { unique: true })

  return model('Universidade', universidadeSchema)
}
