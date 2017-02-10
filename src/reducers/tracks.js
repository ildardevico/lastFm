import { combineReducers } from 'redux'
import { combineEvents } from '../common/helpers/combineEvents'
import {
  LOAD_TRACKS_LIST,
  SET_IS_LOADED,
  LOAD_MORE_TRACKS,
  LOAD_FAVORITE_TRACKS,
  TRACK_FOUND,
  STOP_PLAYER,
  START_PLAY,
  LOAD_MORE_FAVORITE_TRACKS,
} from '../constants'

const trackFound = (state, {
   searchedTrack,
   tracks,
   nowPlayed
}) => ({
  tracks,
  track: searchedTrack,
  nowPlayed,
  isPlaying: true
})

const list = combineEvents({
  [LOAD_TRACKS_LIST]: (state, { tracks }) => tracks,
  [LOAD_MORE_TRACKS]: (state, { tracks }) => [ ...state, ...tracks ],
}, [])

const info = combineEvents({
  [LOAD_TRACKS_LIST]: (state, { info }) => info,
  [LOAD_MORE_TRACKS]: (state, { info }) => info,
}, {})

const isLoaded = combineEvents({
  [SET_IS_LOADED]: (state, { isLoaded }) => isLoaded,
  [LOAD_MORE_TRACKS]: () => true,
  [LOAD_TRACKS_LIST]: () => true,
}, false)

const loadedUpTotheEnd = combineEvents({
  [LOAD_MORE_TRACKS]: (state, { tracks: { length } }) => !length,
  [LOAD_TRACKS_LIST]: (state, { tracks: { length } }) => !length,
}, false)

const lovedTracks = combineEvents({
  [LOAD_FAVORITE_TRACKS]: (state, { lovedtracks }) => lovedtracks,
  [LOAD_MORE_FAVORITE_TRACKS]: (state, { lovedtracks }) => [ ...state, ...lovedtracks ]
}, [])

const lovedInfo = combineEvents({
  [LOAD_FAVORITE_TRACKS]: (state, { info }) => info
}, {})

const currentPlayList = combineEvents({
  [TRACK_FOUND]: trackFound,
  [STOP_PLAYER]: state => ({ ...state, isPlaying: false }),
  [START_PLAY]: state => ({ ...state, isPlaying: true }),
}, {})

export default combineReducers({
  list,
  info,
  isLoaded,
  loadedUpTotheEnd,
  lovedTracks,
  currentPlayList,
  lovedInfo,
})
