const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Users = require('../users/users').model
const errorHelper = require('../../helpers/error')

// Error handler
const handleError = (res, err) => res.status(500).send(err)

// Admin helper
exports.isAdmin = user => user.type === 'admin'

// Internal helper for routes, checks JWT is valid
exports.auth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end()
  const token = req.headers.authorization.split('Bearer ')[1]
  if (!token) return res.status(401).end()

  return jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(401).end()
    req.user = user._doc
    return next()
  })
}

exports.signIn = (req, res) => {
  Users.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) return handleError(res, err)
    if (!user) return errorHelper.throwError('login not found', res)

    const password = req.body.plainTextPassword || req.body.password

    return bcrypt.compare(password, user.password, (bcryptError, matched) => {
      if (bcryptError) return handleError(res, bcryptError)
      if (!matched) return errorHelper.throwError('login wrong password', res)

      user = user.toObject()
      const token = jwt.sign(user, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
      })

      delete user.password

      // Assume user is found
      return res.status(200).json({ token, user })
    })
  })
}

exports.signUp = (req, res, next) => {
  // Forbid admin sign ups
  if (req.body.type === 'admin') return res.status(403).end()

  return bcrypt.hash(req.body.password, 10, (bcryptError, hash) => {
    req.body.plainTextPassword = req.body.password
    req.body.password = hash
    return Users.create(req.body, (err) => {
      if (err) return handleError(res, err)
      return next()
    })
  })
}

exports.hasAdminPermissions = (req, res, next) => {
  if (!this.isAdmin(req.user)) return res.status(403).end()
  return next()
}
