import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/pages/dashboard.scss'
import TrackList from './components/TrackList'

class Dashboard extends Component {

  render() {
    const {
      tracksList,
      currentTag: {
        label
      },
     } = this.props
    return (
      <div className="dashboard-page">
        <h4>{label ? label : 'Top tracks'}</h4>
        <TrackList tracksList={tracksList} />
      </div>
    )
  }
}

Dashboard.propTypes = {
  tracksList: React.PropTypes.array,
  currentTag: React.PropTypes.object,
}

export default connect(
  ({
    tracks: { list: tracksList },
    tags: { currentTag },
  }) => ({ tracksList, currentTag }),
)(Dashboard)
