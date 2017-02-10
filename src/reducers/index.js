import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import tags from './tags'
import tracks from './tracks'

const reducers = {
  routing,
  user,
  tags,
  tracks,
}

export default combineReducers(reducers)
