import { takeEvery, put } from 'redux-saga/effects'
import config from '../../config'
import {
  AUTH_START,
  MAKE_SESSION,
  SESSION_KEY,
  SET_SESSION_KEY,
  EXPIRED_TOKEN,
  LOGOUT,
  USER_NAME,
  GET_USER_INFO,
} from '../constants'
import { callApi, getApiSignature, setSessionKey} from '../common/request/callApi'
import { push } from 'react-router-redux'

function auth() {
  const { apiKey, cb, checkAuthUri } = config
  window.location = `${checkAuthUri}?api_key=${apiKey}&cb=${cb}`
}

function logout() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(USER_NAME)
}

function* getUserInfo(name) {
  const { user } = yield callApi({
    query: {
      user: name,
      method: 'user.getInfo'
    }
  })
  yield put({ type: GET_USER_INFO, user })
}

function* makeSession({ token }) {
  const method = 'auth.getSession'
  const apiSig = getApiSignature({ method, token })

  try {

    const { session: { key, name } } = yield callApi({ query: {
      api_sig: apiSig,
      token,
      method
    }})

    localStorage.setItem(SESSION_KEY, key)
    localStorage.setItem(USER_NAME, name)

    setSessionKey(key)

    yield put({ type: SET_SESSION_KEY, key, name })
    yield getUserInfo(name)
    yield put(push('/'))
  } catch(err) {
    yield put({ type: EXPIRED_TOKEN })
  }
}

export function * authSaga() {

  const key =  localStorage.getItem(SESSION_KEY)
  const name = localStorage.getItem(USER_NAME)

  if(key && name) {
    setSessionKey(key)
    yield put({ type: SET_SESSION_KEY, key, name })
    yield getUserInfo(name)
  }

  yield * [
    takeEvery(AUTH_START, auth),
    takeEvery(MAKE_SESSION, makeSession),
    takeEvery(LOGOUT, logout)
  ]
}
