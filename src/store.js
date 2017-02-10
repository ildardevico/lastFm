import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import reducer from './reducers'
import rootSaga from './sagas'
import { devTools } from './common/helpers/devTools'

const sagaMidelware = createSagaMiddleware()

const routerMiddleware = createRouterMiddleware(browserHistory)

export default createStore(
  reducer,
  compose(
    applyMiddleware(
      thunk,
      devTools('LastFMStore'),
      routerMiddleware,
      sagaMidelware,
    ),
  )
)

sagaMidelware.run(rootSaga)
