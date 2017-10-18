const mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')
const errorHelper = require('../../helpers/error')

const UsersSchema = new Schema({
  categorisedTransactions: [
    {
      description: String,
      category: String,
      subCategory: String,
      amount: Number,
      date: Date
    }
  ],
  categorisationRules: [
    {
      description: String,
      category: String,
      subCategory: String
    }
  ],
  email: { type: String, unique: true, index: 1, required: true },
  firstName: String,
  lastName: String,
  password: { type: String, minlength: 5, maxlength: 60, required: true }
}, {
  timestamps: true
})

const Users = mongoose.model('Users', UsersSchema)
exports.model = Users

const handleError = (res, err) => res.status(500).send(err)

// Create user happens in /auth

// Show all users
exports.index = (req, res) => {
  Users.find((err, users) => {
    if (err) return handleError(res, err)
    return res.status(200).json(users)
  })
}

// Show self
exports.self = (req, res) => {
  Users.findOne({
    _id: req.user._id
  }, (err, user) => {
    if (err) return handleError(res, err)
    // if (!user) return res.status(404).end()
    if (!user) return errorHelper.throwError('user not found', res)

    delete user.password

    // Assume user is found
    return res.status(200).json({ user })
  })
}

// Get a single user
exports.findOne = (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) return handleError(res, err)
    if (!user) return res.status(404).end()
    return res.status(200).json(user)
  })
}

// Delete a user
exports.destroy = (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) return handleError(res, err)
    if (!user) return res.status(404).end()
    return res.sendStatus(204)
  })
}

// Delete a user
exports.addCategorisationRules = (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) return handleError(res, err)
    if (!user) return res.status(404).end()
    return res.sendStatus(204)
  })
}

// Update an existing user
exports.patch = (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) return handleError(res, err)
    if (!user) return res.status(404).end()
    _.merge(user, req.body).save()
    return res.status(200).json(user)
  })
}
