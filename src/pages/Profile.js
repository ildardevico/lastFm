import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/pages/profile.scss'
import TrackList from './components/TrackList'


class Profile extends Component {
  render() {
    const {
      lovedTracks,
    } = this.props
    return (
      <div className='profile-page'>
        <h4>Loved tracks</h4>
        <div className='tracks-container'>
        {lovedTracks.length ?
          <TrackList tracksList={lovedTracks} lovedList />
          : <p>You have not liked any track yet</p>}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  lovedTracks: React.PropTypes.array,
}

export default connect(
  ({ tracks: { lovedTracks } }) => ({ lovedTracks })
)(Profile)
