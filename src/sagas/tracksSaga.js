import { takeEvery, put, select } from 'redux-saga/effects'
import {
  LOAD_TRACKS_LIST,
  CHANGE_TAG,
  TRACKS_SCROLLED,
  REQUEST_INFO_FIELD,
  SET_IS_LOADED,
  LOAD_MORE_TRACKS,
  ADD_TRACK_TO_FAVORITE,
  REMOVE_TRACK_FROM_FAVORITE,
  LOAD_FAVORITE_TRACKS,
  SESSION_KEY,
  USER_NAME,
  PLAY_TRACK,
  TRACK_FOUND,
  TRACK_ENDED ,
  STOP_PLAYER,
} from '../constants'
import config from '../../config'
import { callApi } from '../common/request/callApi'

function* loadTopTracks(type, opt = {}) {
  const { tracks } = yield callApi({
    query: {
      ...opt,
      method: 'chart.getTopTracks'
    }
  })
  yield put({
    type,
    tracks: tracks.track,
    info: tracks[REQUEST_INFO_FIELD]
  })
}

function* loadMoreTracks({ lovedList }) {
  const { info, isLoaded, tagSelected, loadedUpTotheEnd, lovedInfo, user } = yield select(({
    tracks: {
      info,
      isLoaded,
      loadedUpTotheEnd,
      lovedInfo
    },
    tags : {
      currentTag: {
        value: tagSelected
      }
    }
  }) => ({ info, isLoaded, tagSelected, loadedUpTotheEnd, lovedInfo, user }))

  if(isLoaded && !loadedUpTotheEnd) {
    yield put({ type: SET_IS_LOADED, isLoaded: false })
    const { page } = lovedList ? lovedInfo: info
    const opt = { page: page + 1 }
    if(lovedList) {
      const { name: user } = yield select(({ user: { identity } }) => identity)
      yield getFavoriteTracks({ user }, opt)
    } else {
      if(tagSelected) {
        yield getTagTracks(tagSelected, LOAD_MORE_TRACKS, opt)
      } else {
        yield loadTopTracks(LOAD_MORE_TRACKS, opt)
      }
    }
  }
}

function* getTagTracks(tag, type, opt={}) {
  const { tracks } =  yield callApi({
    query: {
      ...opt,
      method: 'tag.gettoptracks',
      tag
    }
  })
  yield put({
    type,
    tracks: tracks.track,
    info: tracks[REQUEST_INFO_FIELD]
  })
}

function* changeTag({ value: { value: tagName } }) {
  if(tagName) {
    yield getTagTracks(tagName, LOAD_TRACKS_LIST)
  } else {
    yield loadTopTracks(LOAD_TRACKS_LIST)
  }
}

function* favorite({ track, artist, add = true }) {
  const method = add ? 'track.love': 'track.unlove'
  const httpMethod = 'POST'
  yield callApi({
    method: httpMethod,
    body: {
      track,
      artist,
      method
    }
  })
  const user = select(({ user : { identity: { name } }}) => name )
  yield getFavoriteTracks({ user })
}

function* getFavoriteTracks({ user }, opt = {}) {
  const method = 'user.getlovedtracks'
  const {
    lovedtracks
  } = yield callApi({
    query : {
      ...opt,
      method,
      user
    }
  })
  yield put({
    type: LOAD_FAVORITE_TRACKS,
    lovedtracks: lovedtracks.track,
    info: lovedtracks[REQUEST_INFO_FIELD]
  })
}

function* play({ track: { name, artist }, tracks }) {
  const [ searchedTrack ] = yield window.SC.get(
    '/tracks',
    {
      q: `${name} ${artist.name}`,
    }
  )
  yield put({ type: TRACK_FOUND, searchedTrack, tracks, nowPlayed: { name, artist } })
}

function* ended() {
  const { tracks, nowPlayed } = yield select(({ tracks: { currentPlayList }}) => currentPlayList)
  const currentTrackIndex = tracks.findIndex(
    ({ name, artist : {name: artist }}) => artist == nowPlayed.artist.name && name == nowPlayed.name
  )
  const nextTrack = tracks[currentTrackIndex + 1]
  if(nextTrack) {
    yield play({ track: nextTrack, tracks })
  } else {
    yield put({ type: STOP_PLAYER })
  }
}

export function* tracksSaga() {
  
  window.SC.initialize({ client_id: config.soundCloudClient })
  yield loadTopTracks(LOAD_TRACKS_LIST)

  const key =  localStorage.getItem(SESSION_KEY)
  const user = localStorage.getItem(USER_NAME)

  if(key && user) {
    yield getFavoriteTracks({ user })
  }

  yield * [
    takeEvery(CHANGE_TAG, changeTag),
    takeEvery(TRACKS_SCROLLED, loadMoreTracks),
    takeEvery(ADD_TRACK_TO_FAVORITE, favorite),
    takeEvery(REMOVE_TRACK_FROM_FAVORITE, favorite),
    takeEvery(PLAY_TRACK, play),
    takeEvery(TRACK_ENDED, ended)
  ]
}
