/**@flow*/

/*istanbul ignore next*/
export function localStorageCache(name: string, stateGetter: Function, stateRestorer: Function): Function {
  return next => (reducer: Function, initialState: Object = {}, extenders: ?Function) => {
    if(!stateGetter || !stateRestorer) {
      throw `It seems like you forgot to provide ${!stateGetter ? 'stateGetter': 'stateRestorer'} function`
    }
    let content:?string = localStorage.getItem(name)
    if (localStorage.hasOwnProperty(name) && content != null) {
      content = stateRestorer(JSON.parse(content))
      try {
        initialState = {
          ...initialState,
          ...content
        }
      } catch (e) {
        throw e
      }
    }
    const store = next(reducer, initialState, extenders)
    store.subscribe(() => {
      const state = store.getState()
      const result = stateGetter(state)
      localStorage.setItem(name, JSON.stringify(result))
    })
    return store
  }
}
