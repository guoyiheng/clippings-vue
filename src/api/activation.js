import request from '@/utils/request'

export function activation(data) {
  return request({
    url: '/api/user/activation',
    method: 'get',
    params: data
  })
}
