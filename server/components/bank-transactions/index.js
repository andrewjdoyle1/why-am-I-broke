const express = require('express')
const controller = require('./bank-transactions')

const router = express.Router()

router.put('/uploadBankTransactions', controller.uploadBankTransaction)

module.exports = router
