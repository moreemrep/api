module.exports = {
  async owner (next, object, requires, context) {
    if (!context.user) throw new Error('U')

    if (object._id != context.user) throw new Error('NOT OWNER')

    return next()
  }
}
