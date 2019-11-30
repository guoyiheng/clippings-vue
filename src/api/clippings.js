import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/api/clipping/add',
    method: 'post',
    data
  })
}

export function find(data) {
  return request({
    url: 'api/clipping/find',
    method: 'post',
    data
  })
}

export function findAllAndCount(data) {
  return request({
    url: '/api/clipping/findAllAndCount',
    method: 'post',
    data
  })
}
// 查询所有书籍
export function findAllBook(data) {
  return request({
    url: '/api/clipping/findAllBook',
    method: 'post',
    data
  })
}
// 根据书籍查询clippings
export function findAllClippingsByBook(data) {
  return request({
    url: '/api/clipping/findAllClippingsByBook',
    method: 'post',
    data
  })
}
// 模糊搜索
export function searchNorAorC(data) {
  return request({
    url: '/api/clipping/searchNorAorC',
    method: 'post',
    data
  })
}
