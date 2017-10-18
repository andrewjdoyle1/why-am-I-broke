import { apiCaller } from './index'
import toUrl from '../helpers/toUrl'

export const logIn = (email, password) => {
  return apiCaller({
    method: 'post',
    url: toUrl('/api/auth/signin'),
    data: { email, password },
    headers: { 'Content-Type': 'application/json' }
  })
}

export const signUp = user => {
  return apiCaller({
    method: 'post',
    url: toUrl('/api/auth/signup'),
    data: user,
    headers: { 'Content-Type': 'application/json' }
  })
}
