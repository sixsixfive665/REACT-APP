import request from 'utils/request.js'

export const login = function (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const table = function (params) {
  return request({
    url: '/table',
    method: 'get',
    params: params
  })
}

export const routes = function (params) {
  return request({
    url: '/mockRoutes',
    method: 'get',
    params: params
  })
}
