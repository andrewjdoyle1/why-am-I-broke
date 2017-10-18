const express = require('express')
const controller = require('./auth')

const router = express.Router()

router.post('/', controller.signIn)
router.post('/signup', controller.signUp, controller.signIn)
router.post('/signin', controller.signIn)

module.exports = router
