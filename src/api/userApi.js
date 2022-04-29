import request from '@/utils/request'

export const userLoginAPI = function (params) {
  return request.post('/user/login', params)
}
