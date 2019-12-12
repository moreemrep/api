import { Mongoose, Document, Model } from 'mongoose'
const paginationPlugin = require('./plugins/mongoose-plugin-relay-pagination.js')

export interface RepublicaDocument extends Document {
  uid: string;
  nome: string;
  endereco: string;
  localizacao: number[];
  disponivel: boolean;
  descricao: string;
}

export type RepublicaModel = Model<RepublicaDocument>

module.exports = (mongoose: Mongoose) => {
  const { Schema, model } = mongoose

  const schema = {
    uid: {
      type: String,
      required: true
    },
    nome: {
      type: String,
      required: true
    },
    endereco: {
      type: String
    },
    descricao: {
      type: String
    },
    localizacao: {
      type: { type: String },
      coordinates: [Number]
    },
    disponivel: {
      type: Boolean,
      required: true
    }
  }
  const republicaSchema = new Schema(schema, { timestamps: true })

  republicaSchema.index({ localizacao: '2dsphere' })

  republicaSchema.plugin(paginationPlugin)

  republicaSchema.index({ uid: 'text' }, { unique: true })

  return model('Republica', republicaSchema)
}
