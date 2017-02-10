import { Route } from 'react-router'
import { push } from 'react-router-redux'

export default class AccessRoute extends Route {
  static defaultProps = {
    onEnter(nextState, replaceState, callback) {
      const
        redirect = this.redirect,
        check = this.check,
        store = this.store,
        state = store.getState()
      if (check(state)) {
        callback()
      } else {
        store.dispatch(push(redirect))
      }
    }
  }
}
