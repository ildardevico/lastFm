import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from '../../../config'
import '../../styles/components/player.scss'
import { TRACK_ENDED, STOP_PLAYER, START_PLAY } from '../../constants'

class Player extends Component {
  componentDidMount() {
    this.refs.audio.addEventListener('ended', this.props.trackEnded)
    this.refs.audio.addEventListener('pause', this.togglePlay)
    this.refs.audio.addEventListener('play', this.togglePlay)
  }

  componentWillUnmount() {
    this.refs.audio.removeEventListener('ended')
    this.refs.audio.removeEventListener('pause')
    this.refs.audio.removeEventListener('play')
  }

  togglePlay = () => {
    if (this.refs.audio.paused) {
      this.props.stopPlay()
    } else {
      this.props.startPlay()
    }
  }

  buildSrc = src => `${src}?client_id=${config.soundCloudClient}`

  render() {
    const { track : { stream_url } = {} } = this.props
    return <audio
            ref="audio"
            controls
            autoPlay
            crossOrigin="anonymous"
            src={this.buildSrc(stream_url)}
            className='player'
        />
  }

}

Player.propTypes = {
  track: React.PropTypes.object,
  trackEnded: React.PropTypes.func,
  stopPlay: React.PropTypes.func,
  startPlay: React.PropTypes.func,
}

export default connect(
  ({ tracks: { currentPlayList: { track, tracks } }}) => ({ track, tracks }),
  dispatch => ({
    trackEnded: () => dispatch({ type: TRACK_ENDED }),
    stopPlay: () => dispatch({ type: STOP_PLAYER }),
    startPlay: () => dispatch({ type: START_PLAY })
  })
)(Player)
