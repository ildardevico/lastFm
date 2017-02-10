export function createPromiseAction(action, success, fail = null) {
  return (...options) => (
    dispatch => (
      action(...options).then(response => {
        if(response.success) {
          return dispatch({
            type: success,
            ...response
          })
        } else {
          return dispatch({
            type: !fail ? `${success}_FAIL`: fail,
            ...response
          })
        }
      })
    ))
}
