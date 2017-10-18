import * as types from '../constants/actionTypes'
import * as bankTransactionsApi from '../api/bankTransactions'

export const setBankTransactions = bankTransactions => {
  return {
    type: types.SET_BANK_TRANSACTIONS,
    bankTransactions
  }
}

export const uploadBankTransactions = bankTransactions => {
  return dispatch => {
    return bankTransactionsApi.uploadBankTransactions(bankTransactions)
      .then(response => {
        dispatch(setBankTransactions(response.data))
      })
  }
}
