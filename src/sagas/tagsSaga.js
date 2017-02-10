import { put } from 'redux-saga/effects'
import {
  LOAD_TAGS_LIST,
  REQUEST_INFO_FIELD,
} from '../constants'
import { camelize } from '../common/helpers/utills'
import { callApi } from '../common/request/callApi'

function* loadTags() {
  const { tags } = yield callApi({
    query: {
      method: 'chart.getTopTags'
    }
  })
  yield put({
    type: LOAD_TAGS_LIST,
    tags: tags.tag.map(tag => ({
      ...tag,
      name: camelize(tag.name)
    })),
    info: tags[REQUEST_INFO_FIELD]
  })
}

export function * tagsSaga() {
  yield loadTags()
}
