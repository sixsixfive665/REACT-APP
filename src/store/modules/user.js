import Lockr from 'lockr/index'

let userInfo = {}
if (Lockr.get('user')) {
  userInfo = {
    ...Lockr.get('user')
  }
}
function userReducer(state = { ...userInfo }, action) {
  let UpdateUser = 'UpdateUser'
  let FrontLogout = 'FrontLogout'
  switch (action.type) {
    case UpdateUser:
      let result = { ...state, ...action.payload }
      return result
    case FrontLogout:
      Lockr.rm('token')
      Lockr.rm('user')
      state = {}
      return state
    default:
      return state
  }
}

export default userReducer