import { createStore, combineReducers } from 'redux'
import userReducer from './modules/user'
import configReducer from './modules/config'
import routerReducer from './modules/router'
const allReducers = {
  user: userReducer,
  config: configReducer,
  router: routerReducer
}
const rootReducer = combineReducers(allReducers)
let store = createStore(rootReducer)
export default store