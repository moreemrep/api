import { Context } from '../../apollo'
import { CODES } from '../../error'

module.exports = {
  async auth (next, _, requires, context: Context) {
    const { token, services, repositories } = context

    if (!token) throw new Error(CODES.UNAUTHENTICATED)

    const { firebase, redis } = services
    const { uid } = await firebase.verifyIdToken(token)
    const _id = await redis.get(uid)

    if (_id) {
      context.user = _id
    } else {
      const { Republica } = repositories.mongoose.models
      const user = await Republica.findOne({ uid }, { _id: 1 })

      if (!user) throw new Error(CODES.NOT_FOUND)

      await redis.set(uid, user._id.toString())
      context.user = user._id
    }

    if (!context.user) throw new Error(CODES.UNAUTHENTICATED)

    return next()
  }
}
