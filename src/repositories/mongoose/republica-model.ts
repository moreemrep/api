import { CODES } from '../../error'
import { Mongoose, Document, Model } from 'mongoose'
const paginationPlugin = require('./plugins/mongoose-plugin-relay-pagination.js')

export interface RepublicaDocument extends Document {
  uid: string;
  devicesOwned: [string];
  devicesInvited: [string];
  favoriteDevice: string;
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
      required: true,
      unique: true
    },
    endereco: {
      type: String
    },
    localizacao: {
      type: { type: String },
      coordinates: [Number]
    }
  }
  const userSchema = new Schema(schema, { timestamps: true })

  userSchema.index({ localizacao: '2dsphere' })

  userSchema.plugin(paginationPlugin)

  userSchema.index({ uid: 'text' }, { unique: true })
  userSchema.index({ email: 'text' }, { unique: true })

  userSchema.statics.register = function (newRepublica) {
    return this.create(newRepublica).catch(err => {
      console.log(err)
      switch (err.code) {
        case 11000:
          throw new Error(CODES.USER_REGISTERED)
        default:
          throw err
      }
    })
  }

  userSchema.statics.getField = async function (params, field) {
    const user = await this.findOne(params, { [field]: 1 })
    if (!user) throw new Error('USER_NOT_FOUND')
    if (!user[field]) throw new Error('FIELD_NOT_FOUND')
    return user[field]
  }

  userSchema.statics.get = async function (params, projection) {
    const user = await this.findOne(params, projection)
    if (!user) throw new Error('USER_NOT_FOUND')
    return user
  }

  return model('Republica', userSchema)
}
