
const toUrl = _path => {
  const path = _path || ''
  function getServerCtxRootIdx(absUrl) {
    return absUrl.indexOf('/', absUrl.indexOf('//') + 2)
  }

  function getHashIdx(absUrl, rootIdx) {
    const hashIdx = absUrl.indexOf('#', rootIdx)
    if (hashIdx > rootIdx) {
      return absUrl.lastIndexOf('/', hashIdx)
    }
    return absUrl.lastIndexOf('/')
  }

  function getBaseUrl() {
    if (location.hostname === 'localhost') {
      return location.origin.replace('3000', '9000')
    }

    const absUrl = window.location.href
    const rootIdx = getServerCtxRootIdx(absUrl)
    const hashIdx = getHashIdx(absUrl, rootIdx)
    return hashIdx <= rootIdx ? '' : absUrl.substring(rootIdx, hashIdx)
  }

  return getBaseUrl() + path
}

export default toUrl
