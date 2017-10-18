import initialState from './initialState'
import {
  SET_BANK_TRANSACTIONS
} from '../constants/actionTypes'

const bankTransactions = (state = initialState.bankTransactions, action) => {
  switch (action.type) {
    case SET_BANK_TRANSACTIONS:
      return [
        ...state,
        ...action.bankTransactions
      ]
    default:
      return state
  }
}

export default bankTransactions
