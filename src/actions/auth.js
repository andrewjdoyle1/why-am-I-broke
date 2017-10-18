import * as types from '../constants/actionTypes'
import * as authApi from '../api/auth'
import * as usersActions from './users'

export const setToken = token => {
  return {
    type: types.SET_TOKEN,
    token
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch(usersActions.setCurrentUser())
  }
}

export const logIn = (email, password) => {
  return dispatch => {
    return authApi.logIn(email, password)
      .then(response => {
        dispatch(usersActions.setCurrentUser(response.data.user))
        dispatch(setToken(response.data.token))
      })
  }
}

export const signUp = user => {
  return dispatch => {
    return authApi.signUp(user)
      .then(response => {
        dispatch(usersActions.setCurrentUser(response.data.user))
        dispatch(setToken(response.data.token))
      })
  }
}
