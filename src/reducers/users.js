import initialState from './initialState'
import {
  SET_ALL_USERS,
  SET_CURRENT_USER
} from '../constants/actionTypes'

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.users
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }
    default:
      return state
  }
}

export default users
