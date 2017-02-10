import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TRACKS_SCROLLED, ADD_TRACK_TO_FAVORITE, REMOVE_TRACK_FROM_FAVORITE, PLAY_TRACK } from '../../constants'
import TrackSingleView from './TrackSingleView'

const lovedCondition = track => ({ name, artist : {name: artist}}) => name == track.name && artist == track.artist.name

class TrackList extends Component {

  componentDidMount() {
    const { handleScroll, lovedList } = this.props
    this.refs.tracks.addEventListener('scroll', e => handleScroll(e, lovedList))
  }

  isLoved = track => ~this.props.lovedTracks.findIndex(lovedCondition(track))

  render() {
    const {
      tracksList,
      addToFavorite,
      isAuthenticated,
      removeFromFavorite,
      play,
      nowPlayed,
      isPlaying,
      lovedList,
     } = this.props
    return (
      <div ref='tracks' className='tracks-container'>
        {tracksList.map((track, i) =>(
          <TrackSingleView
            key={i}
            track={track}
            like={addToFavorite}
            dislike={removeFromFavorite}
            showLikeIcon={isAuthenticated}
            liked={lovedList || !!this.isLoved(track)}
            play={() => play(track, tracksList)}
            nowPlayed={nowPlayed}
            isPlaying={isPlaying}
           />
        ))}
      </div>
    )
  }
}

TrackList.propTypes = {
  tracksList: React.PropTypes.array,
  currentTag: React.PropTypes.object,
  handleScroll: React.PropTypes.func,
  addToFavorite: React.PropTypes.func,
  lovedTracks: React.PropTypes.array,
  isAuthenticated: React.PropTypes.bool,
  removeFromFavorite: React.PropTypes.func,
  play: React.PropTypes.func,
  nowPlayed: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  lovedList: React.PropTypes.bool,
}

const checkIfScrollBottom = ({ scrollTop, scrollHeight, offsetHeight }) => scrollTop == (scrollHeight - offsetHeight)

export default connect(
  ({
    tracks: { isLoaded, lovedTracks, currentPlayList: { nowPlayed, isPlaying } },
    tags: { currentTag },
    user: { isAuthenticated }
  }) => ({ currentTag, isLoaded, isAuthenticated, lovedTracks, nowPlayed, isPlaying }),
  dispatch => ({
    handleScroll: (e, lovedList) => checkIfScrollBottom(e.target) && dispatch({ type: TRACKS_SCROLLED, lovedList }),
    addToFavorite: (track, artist) => dispatch({ type: ADD_TRACK_TO_FAVORITE, track, artist }),
    removeFromFavorite: (track, artist) => dispatch({ type: REMOVE_TRACK_FROM_FAVORITE, track, artist, add: false }),
    play: (track, tracks) => dispatch({ type: PLAY_TRACK, track, tracks })
  })
)(TrackList)
