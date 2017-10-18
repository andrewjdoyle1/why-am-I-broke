import initialState from './initialState'
import {
  SET_TOKEN
} from '../constants/actionTypes'

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}

export default auth
