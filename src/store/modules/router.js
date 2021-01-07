const router = {
  routes: []
}
function routerReducer(state = { ...router }, action) {
  let UpdateRouter = 'UpdateRouter'
  switch (action.type) {
    case UpdateRouter:
      let result = { ...state, ...action.payload }
      return result
    default:
      return state
  }
}

export default routerReducer