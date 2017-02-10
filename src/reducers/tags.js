import { combineReducers } from 'redux'
import { combineEvents } from '../common/helpers/combineEvents'
import { LOAD_TAGS_LIST, CHANGE_TAG } from '../constants'

const list = combineEvents({
  [LOAD_TAGS_LIST]: (state, { tags }) => tags
}, [])

const loadedInfo = combineEvents({
  [LOAD_TAGS_LIST]: (state, { info }) => info
}, {})

const currentTag =  combineEvents({
  [CHANGE_TAG]: (state, { value }) => value
}, {})

export default combineReducers({
  list,
  loadedInfo,
  currentTag,
})
