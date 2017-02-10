import React from 'react'
import moment from 'moment'
import 'moment-duration-format'
import { buildImageUrl } from '../../common/helpers/utills'
import { MEDIUM_IMAGE } from '../../constants'
import '../../styles/components/trackSingleView.scss'
import PlayingSpinner from '../../common/components/PlayingSpinner'


const isNowPlayed = ({ name, artist : { name: artist } }, nowPlayed) =>
  name == nowPlayed.name && artist == nowPlayed.artist.name

const getImageContainer = (image, play, showSpinner = false) =>
  <div onClick={play} style={{ backgroundImage: buildImageUrl(image, MEDIUM_IMAGE) }} className='track-image' >
    {showSpinner ? <PlayingSpinner />: null}
  </div>

const getTrackDuration = duration => {
  if(!parseInt(duration)) {
    return <span/>
  }
  return (
     <span className='duration'>{moment.duration(parseInt(duration), 'seconds').format('mm:ss')}</span>
  )
}

const TrackSingleView = props => {
  const { track, like, dislike, showLikeIcon, liked, play, nowPlayed, isPlaying } = props
  const { name, artist, image, duration } = track
  const showSpinner = isPlaying && nowPlayed && isNowPlayed(track, nowPlayed)
  return (
    <div  className='sngle-track-view'>
      {getImageContainer(image, play, showSpinner)}
      <div className='track-info'>
        <span className='track-name'>{name}</span><br/>
        <span>
          {artist.name}
          {getTrackDuration(duration)}
        </span>
      </div>
      <div className={`track-actions ${liked ? 'liked': ''}`}>
        { showLikeIcon ?
           <i
            onClick={liked ? () => dislike(name, artist.name): () => like(name, artist.name)}
            className='material-icons'>
            {liked ? 'favorite': 'favorite_border'}
           </i>:
           null
         }
      </div>
    </div>
  )
}

TrackSingleView.propTypes = {
  like: React.PropTypes.func,
  dislike: React.PropTypes.func,
  track: React.PropTypes.object,
  showLikeIcon: React.PropTypes.bool,
  liked: React.PropTypes.bool,
  play: React.PropTypes.func,
  nowPlayed: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
}

export default TrackSingleView
