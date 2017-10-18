const express = require('express')

const router = express.Router()

router.use('/api/auth', require('./components/auth'))
router.use('/api/users', require('./components/users'))
router.use('/api/bank-transactions', require('./components/bank-transactions'))

router.get('/', (req, res) => res.send('Why am I broke API'))

module.exports = router
