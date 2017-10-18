const express = require('express')
const controller = require('./users')
const secure = require('../auth/auth')

const router = express.Router()

router.get('/', secure.auth, secure.hasAdminPermissions, controller.index)
router.get('/:id', secure.auth, secure.hasAdminPermissions, controller.findOne)
router.patch('/:id', secure.auth, controller.patch)
router.delete('/:id', secure.auth, secure.hasAdminPermissions, controller.destroy)

module.exports = router
