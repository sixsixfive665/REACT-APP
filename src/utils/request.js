import axios from 'axios'
import { message } from 'antd';
import store from 'store/index';
import { createHashHistory } from 'history';
import Lockr from 'lockr/index'

// 创建axios实例
const service = axios.create({
  baseURL: store.getState().config.baseUrl,
  timeout: 5000 // 请求超时时间
})
const hashHistory = createHashHistory();

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = Lockr.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // console.log(dataAxios)
    // 根据具体情况判断
    return dataAxios
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权或登录过期，请重新登录'
          if (store.getState().user.token) {
            message.error(error.message)
            store.dispatch({
              type: 'FrontLogout'
            })
            store.dispatch({
              type: 'UpdateConfig',
              payload: {
                isLoading: true
              }
            })
            setTimeout(() => {
              store.dispatch({
                type: 'UpdateConfig',
                payload: {
                  isLoading: false
                }
              })
              hashHistory.push('/login')
              console.clear()
            }, 1500);
          }
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    return Promise.resolve(error)
  }
)

export default service