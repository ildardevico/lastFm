export function devTools(name: string) {
  if (process.env.NODE_ENV === 'production') {
    // Prevent production application from console related bugs of IE and eating memory by caching console outputs
    return () => next => next
  } else {
    return ({getState}) => next => event => {
      const execute = data => {
        const
          initialState = getState(),
          result = next(data),
          finalState = getState()
        console.groupCollapsed('Dispatch event ' + data.type + ' in ' + name) // eslint-disable-line no-console
        console.log('Original State:', initialState)
        console.log('New state:', finalState)
        console.groupEnd() // eslint-disable-line no-console
        return result
      }
      if (event instanceof Function) {
        return event(execute, getState)
      } else {
        return execute(event)
      }
    }
  }
}
