import * as types from '../constants/actionTypes'
import * as usersApi from '../api/users'

export const setCurrentUser = user => {
  return {
    type: types.SET_CURRENT_USER,
    user
  }
}

export const setAllUsers = users => {
  return {
    type: types.SET_ALL_USERS,
    users
  }
}

export const getAllUsers = () => {
  return dispatch => {
    return usersApi.getAllUsers()
      .then(response => {
        dispatch(setAllUsers(response.data))
      })
  }
}

export const addCategorisationRule = (user, categorisationRule) => {
  return (dispatch, getState) => {
    return usersApi.addCategorisationRule(user, categorisationRule, getState().auth.token)
      .then(response => {
        dispatch(setCurrentUser(response.data))
      })
  }
}

export const removeCategorisationRule = (user, categorisationRule) => {
  return (dispatch, getState) => {
    return usersApi.removeCategorisationRule(user, categorisationRule, getState().auth.token)
      .then(response => {
        dispatch(setCurrentUser(response.data))
      })
  }
}
