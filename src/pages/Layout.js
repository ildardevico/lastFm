import React, { Component } from 'react'
import Navbar from './components/Navbar'
import '../styles/main.scss'
import Spinner from 'react-md-spinner'
import { connect } from 'react-redux'
import Player from './components/Player'

class Layout extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        {this.props.children}
        <div className='spinner-container'>
          {!this.props.isLoaded ? <Spinner size={70} />: null}
        </div>
        <div>
          <Player />
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.any,
  isLoaded: React.PropTypes.bool,
}

export default connect(
  ({ tracks: { isLoaded } }) => ({ isLoaded }),
)(Layout)
