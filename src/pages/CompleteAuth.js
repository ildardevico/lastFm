import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { MAKE_SESSION, AUTH_START } from '../constants'
import '../styles/pages/completeAuth.scss'

class CompleteAuth extends Component {

  componentDidMount() {
    const { location: { query: { token } } } = this.props
    this.props.makeSession(token)
  }

  render() {
    const { expiredToken } = this.props
    return (
      <div className='complete-auth'>
        {!expiredToken ?
          <h3>Wait while we validate your token...</h3>:
          <div>
            <h3>Your token has already used</h3>
            <span>
              <p>Please try again</p>
              <p>
                <Button onClick={this.props.startAuth}>Try Again</Button>
              </p>
            </span>
          </div>
        }
      </div>
    )
  }
}

CompleteAuth.propTypes = {
  location: React.PropTypes.object,
  makeSession: React.PropTypes.func,
  expiredToken: React.PropTypes.bool,
  startAuth: React.PropTypes.func,
}

export default connect(
  ({ user: { expiredToken } }) => ({ expiredToken }),
  dispatch => ({
    makeSession: token => dispatch({ type: MAKE_SESSION, token }),
    startAuth: () => dispatch({ type: AUTH_START })
  })
)(CompleteAuth)
