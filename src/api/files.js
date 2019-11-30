import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/api/file/add',
    method: 'post',
    data
  })
}
export function deleteOne(data) {
  return request({
    url: '/api/file/delete',
    method: 'post',
    data
  })
}
export function findAllAndCount(data) {
  return request({
    url: '/api/file/findAllAndCount',
    method: 'post',
    data
  })
}
export function analysisFile(data) {
  return request({
    url: '/api/file/analysisFile',
    method: 'post',
    data
  })
}
