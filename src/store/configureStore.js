import {createStore, compose, applyMiddleware} from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import { loadState, saveState } from './localStorage'
export const history = createHistory()

function configureStoreProd(initialState) {
  const state = loadState() || initialState
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware
  ]

  const store = createStore(rootReducer, state, compose(
    applyMiddleware(...middlewares)
    )
  )

  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

function configureStoreDev(initialState) {
  const state = loadState() || initialState
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware
  ]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(rootReducer, state, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  store.subscribe(() => {
    saveState(store.getState())
  })
  return store
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
