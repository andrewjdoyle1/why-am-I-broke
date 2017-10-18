import axios from 'axios'

const generateAuthorisedApi = (authToken, customTimeout) => {
  const authorisedApi = axios.create()

  // Retry a failed service request once
  const retryFailedRequest = (err) => {
    if (err.response && err.response.status === 500 && err.config && !err.config.__isRetryRequest) {
      // eslint-disable-next-line no-param-reassign
      err.config.__isRetryRequest = true
      return axios(err.config)
    }
    throw err
  }

  authorisedApi.interceptors.response.use(undefined, retryFailedRequest)

  authorisedApi.interceptors.request.use((config) => {
    const _config = config
    _config.headers.Accept = '*/*'
    if (authToken) {
      _config.headers.Authorization = `Bearer ${authToken}`
    }
    return _config
  }, (error) => {
    return Promise.reject(error)
  })

  authorisedApi.defaults.timeout = customTimeout || 20000

  return authorisedApi
}

export function apiCaller({ method = '', url = '', data, params, headers }, authToken) {
  const authorisedApiCaller = generateAuthorisedApi(authToken)
  return authorisedApiCaller({ method, url, data, params, headers })
}
