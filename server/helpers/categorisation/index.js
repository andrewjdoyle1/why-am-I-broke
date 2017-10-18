const _ = require('lodash')
const unknownCategorisation = { categoryOne: 'Unknown' }

const categorisation = {
  categorise: (categorisationRules, transactions) => {
    let categorisedTransactions = []
    transactions.forEach(transaction => {
      const relevantCategorisation = categorisationRules.find(categorisationRule => {
        return transaction.description.indexOf(categorisationRule.description) > -1
      })
      if (relevantCategorisation) {
        categorisedTransactions = [
          ...categorisedTransactions,
          _.merge(transaction, relevantCategorisation)
        ]
      } else {
        categorisedTransactions = [
          ...categorisedTransactions,
          _.merge(transaction, unknownCategorisation)
        ]
      }
    })
    return categorisedTransactions
  }
}

module.exports = categorisation
