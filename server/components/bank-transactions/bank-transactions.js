const csv = require('csvtojson')
const categorisationHelper = require('../../helpers/categorisation')

exports.uploadBankTransaction = (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }
  const bankTransactions = req.files.bankTransactions
  if (!bankTransactions) {
    return res.status(400).send('Invalid request body.')
  }
  bankTransactions.mv(`server/bankTransactions/${bankTransactions.name}`, err => {
    if (err) {
      return res.status(500).send(err)
    }
    let transactionsArray = []
    csv({ noheader: true })
      .fromFile(`server/bankTransactions/${bankTransactions.name}`)
      .on('json', jsonObj => {
        transactionsArray.push(jsonObj)
      })
      .on('done', () => {
        categorisationHelper.categorise([], transactionsArray)
        res.send(transactionsArray)
      })
  })
}
