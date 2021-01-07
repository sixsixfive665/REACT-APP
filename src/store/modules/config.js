import common from './../../scss/common.scss'
import Lockr from 'lockr/index'

const config = {
  baseUrl: 'https://www.fastmock.site/mock/ffb77a979ff0f5a28b06472b4eec5a0a/example',
  authPath: '/login',
  isLoading: false,
  menuCollapsed: Lockr.get('config') ? Lockr.get('config').menuCollapsed : false,
  theme: '',
  themeColorArr: []
}
for (let key in common) {
  config.themeColorArr.push(common[key])
}
config.theme = Lockr.get('config') ? Lockr.get('config').theme : config.themeColorArr[0]
// console.log(config)
function configReducer(state = { ...config }, action) {
  let UpdateConfig = 'UpdateConfig'
  switch (action.type) {
    case UpdateConfig:
      let result = { ...state, ...action.payload }
      return result
    default:
      return state
  }
}

export default configReducer