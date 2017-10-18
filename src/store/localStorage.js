/* eslint-disable no-console */
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    sessionStorage.setItem('state', JSON.stringify(state))
  } catch (err) {
    console.log(err)
  }
}

export const clearState = () => {
  try {
    sessionStorage.removeItem('state')
  } catch (err) {
    console.log(err)
  }
}

