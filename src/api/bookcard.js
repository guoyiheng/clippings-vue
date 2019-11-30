import request from '@/utils/request'

export function updateOne(data) {
  return request({
    url: '/api/clipping/update',
    method: 'post',
    data
  })
}

export function deleteOne(data) {
  return request({
    url: '/api/clipping/delete',
    method: 'post',
    data
  })
}
