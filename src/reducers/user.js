import { combineEvents } from '../common/helpers/combineEvents'
import { combineReducers } from 'redux'
import { SET_SESSION_KEY, EXPIRED_TOKEN, LOGOUT, GET_USER_INFO } from '../constants'

const setNull = () => null
const sk = combineEvents({
  [SET_SESSION_KEY]: (state, { key }) => key,
  [LOGOUT]: setNull
}, null)

const username = combineEvents({
  [SET_SESSION_KEY]: (state, { name }) => name,
  [LOGOUT]: setNull,
}, null)

const expiredToken = combineEvents({
  [EXPIRED_TOKEN]: () => true,
  [SET_SESSION_KEY]: () => false,
}, false)

const isAuthenticated = combineEvents({
  [SET_SESSION_KEY]: () => true,
  [LOGOUT]: () => false,
}, false)

const identity = combineEvents({
  [GET_USER_INFO]: (state, { user }) => user,
  [LOGOUT]: setNull,
}, null)

export default combineReducers({
  sk,
  expiredToken,
  isAuthenticated,
  username,
  identity,
})
