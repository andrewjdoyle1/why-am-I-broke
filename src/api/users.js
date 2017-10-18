import _isEqual from 'lodash/isEqual'
import { apiCaller } from './index'
import toUrl from '../helpers/toUrl'

export const getAllUsers = () => {
  return apiCaller({
    method: 'get',
    url: toUrl('/api/users/')
  })
}

export const addCategorisationRule = (user, categorisationRule, authToken) => {
  return apiCaller({
    method: 'patch',
    url: toUrl(`/api/users/${user._id}`),
    data: { categorisationRules: [...user.categorisationRules, categorisationRule] },
    headers: { 'Content-Type': 'application/json' }
  }, authToken)
}

export const removeCategorisationRule = (user, _categorisationRule, authToken) => {
  const filteredCategorisationRules = user.categorisationRules.filter(categorisationRule => {
    return !_isEqual(categorisationRule, _categorisationRule)
  })
  return apiCaller({
    method: 'patch',
    url: toUrl(`/api/users/${user._id}`),
    data: { categorisationRules: filteredCategorisationRules },
    headers: { 'Content-Type': 'application/json' }
  }, authToken)
}
