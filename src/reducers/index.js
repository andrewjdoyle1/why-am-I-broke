import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import bankTransactions from './bankTransactions'
import users from './users'

const rootReducer = combineReducers({
  auth,
  bankTransactions,
  form: formReducer,
  users,
  routing: routerReducer
})

export default rootReducer
