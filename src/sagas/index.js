import { fork } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { tagsSaga } from './tagsSaga'
import { tracksSaga } from './tracksSaga'

export default function* rootSaga () {
  yield * [
    fork(authSaga),
    fork(tagsSaga),
    fork(tracksSaga),
  ]
}
