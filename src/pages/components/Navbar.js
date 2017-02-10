import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { push } from 'react-router-redux'
import  { connect } from 'react-redux'
import { AUTH_START, LOGOUT, CHANGE_TAG } from '../../constants'
import Select from '../../common/components/Select'

class NavBar extends Component {

  render() {
    const { isAuthenticated, goTo, startAuth, logout, tagsList, currentTag, changeTag, location } = this.props
    const { pathname } = location
    const profile = pathname === '/profile'
    return (
      <div className='main-navbar'>
        <Navbar inverse staticTop>
          <Navbar.Header>
            <Nav>
              <NavItem onClick={() => goTo('/')}>LastFm</NavItem>
            </Nav>
          </Navbar.Header>
          <Nav pullRight>
            {!profile ? <Nav>
              <Navbar.Form pullLeft>
                <Select
                  value={currentTag}
                  options={tagsList.map(({name}) => ({ label: name, value: name }))}
                  onChange={changeTag}
                  placeholder='Select Tag...'
                  searchable
                 />
              </Navbar.Form>
            </Nav>: null}
            {isAuthenticated ?
               <NavItem
                onClick={profile ? () => goTo('/') : () => goTo('/profile')}
                >
               {profile ? 'Dashboard' :'Profile'}
               </NavItem>
               : null}
            <NavItem onClick={isAuthenticated ? logout: startAuth}>
              {isAuthenticated ? 'Logout': 'Login'}
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

NavBar.propTypes = {
  startAuth: React.PropTypes.func,
  isAuthenticated: React.PropTypes.bool,
  goTo: React.PropTypes.func,
  logout: React.PropTypes.func,
  tagsList: React.PropTypes.array,
  currentTag: React.PropTypes.object,
  changeTag: React.PropTypes.func,
  location: React.PropTypes.object,
}

export default connect(
  ({
    routing: {
      locationBeforeTransitions: location
    },
    user: {
      isAuthenticated
    },
    tags: {
      list: tagsList,
      currentTag
    }
  }) => ({
    isAuthenticated,
    tagsList,
    currentTag,
    location,
  }),
  dispatch => ({
    startAuth: () => dispatch({ type: AUTH_START }),
    goTo: path => dispatch(push(path)),
    logout: () => dispatch({ type: LOGOUT }),
    changeTag: value => dispatch({ type: CHANGE_TAG, value: value || {} })
  })
)(NavBar)
