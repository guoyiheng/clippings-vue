import request from '@/utils/request'

export function findAllFavorite(data) {
  return request({
    url: '/api/clipping/findAllFavorite',
    method: 'post',
    data
  })
}
