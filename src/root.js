import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import store from './store'
import AccessRoute from './common/components/AccessRoute'
import Layout from './pages/Layout'
import CompleteAuth from './pages/CompleteAuth'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

const history = syncHistoryWithStore(browserHistory, store)
const checkIsNotAuthenticated = ({ user: { isAuthenticated }}) => !isAuthenticated

render((
  <Provider store={store}>
    <Router history={history}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Dashboard} />
          <AccessRoute store={store} check={checkIsNotAuthenticated} redirect='/'>
            <Route path='/complete-auth' component={CompleteAuth} />
          </AccessRoute>
          <AccessRoute store={store} check={state => !checkIsNotAuthenticated(state)} redirect='/'>
            <Route path='/profile' component={Profile}/>
          </AccessRoute>
        </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
