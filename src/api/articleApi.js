import request from '@/utils/request'

// 获取所有文章
export const getArticleListAPI = function () {
  return request.get('/article/all')
}

// 获取文章的标签
export const getArtTaglistAPI = function (id) {
  return request.get('/article/tag?art_id=' + id)
}

// 获取所有的标签
export const getAllTagAPI = function () {
  return request.get('/article/tag/all')
}

// 通过标签获取文章
export const searchByTagAPI = function (tag) {
  return request.get('/article/tag/name?tagName=' + tag)
}

// 通过关键词获取文章
export const searchByKeywordAPI = function (keyword) {
  return request.get('/article/search?keyword=' + keyword)
}

// 通过id获取文章
export const getArtByIdAPI = function (id) {
  return request.get('/article/detail?id=' + id)
}

// 删除文章
export const delArtByIdAPI = function (id) {
  return request.get('/article/del?id=' + id)
}

// 添加文章
export const addArticleAPI = function (params) {
  return request.post('/article/add', params)
}

// 添加文章标签
export const addIntoTaglistAPI = function (params) {
  return request.post('/article/addIntoTaglist', params)
}

// 获取文章列表最后一个id
export const getLastIdAPI = function () {
  return request.get('/article/lastId')
}

// 更新文章信息
export const updateArticleAPI = function (params) {
  return request.post('/article/update', params)
}

// 删除文章的标签
export const delArticleTagAPI = function (id) {
  return request.get('/article/delArtTag?id=' + id)
}

// 添加标签
export const addTagAPI = function (params) {
  return request.post('/article/addTag', params)
}

// 删除标签
export const delTagAPI = function (id) {
  return request.get('/article/delTag?id=' + id)
}

// 更新标签内容
export const updateTagAPI = function (params) {
  return request.post('/article/updateTag', params)
}

// 根据 id 获取标签
export const getTagByIdAPI = function (id) {
  return request.get('/article/getTag?id=' + id)
}
