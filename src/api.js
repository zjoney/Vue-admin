/* eslint-disable */
import axios from '@/http'
import qs from 'qs'
let domain = '/api/v1'
export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axios[method](queryUrl, body, config)
  } else if (method === 'get') {
    return axios[method](queryUrl, {
      params: form
    }, config)
  } else {
    return axios[method](queryUrl, qs.stringify(form), config)
  }
}
/*==========================================================
 *                    
 ==========================================================*/
/**
 * 查询文档信息，根据条件s（未传条件返回空列表）
 * request: listArticlesUsingGET
 * url: listArticlesUsingGETURL
 * method: listArticlesUsingGET_TYPE
 * raw_url: listArticlesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param authorId - 作者id
 * @param categoryId - 板块ID
 */
export const listArticlesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['authorId'] !== undefined) {
    queryParameters['authorId'] = parameters['authorId']
  }
  if (parameters['categoryId'] !== undefined) {
    queryParameters['categoryId'] = parameters['categoryId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listArticlesUsingGET_RAW_URL = function() {
  return '/articles'
}
export const listArticlesUsingGET_TYPE = function() {
  return 'get'
}
export const listArticlesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['authorId'] !== undefined) {
    queryParameters['authorId'] = parameters['authorId']
  }
  if (parameters['categoryId'] !== undefined) {
    queryParameters['categoryId'] = parameters['categoryId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 添加文档
 * request: saveArticleUsingPOST
 * url: saveArticleUsingPOSTURL
 * method: saveArticleUsingPOST_TYPE
 * raw_url: saveArticleUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param article - article
 */
export const saveArticleUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['article'] !== undefined) {
    body = parameters['article']
  }
  if (parameters['article'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: article'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveArticleUsingPOST_RAW_URL = function() {
  return '/articles'
}
export const saveArticleUsingPOST_TYPE = function() {
  return 'post'
}
export const saveArticleUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询文档更新记录
 * request: listArticleRecordsUsingGET
 * url: listArticleRecordsUsingGETURL
 * method: listArticleRecordsUsingGET_TYPE
 * raw_url: listArticleRecordsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param articleId - 文章ID
 */
export const listArticleRecordsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles/records'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['articleId'] !== undefined) {
    queryParameters['articleId'] = parameters['articleId']
  }
  if (parameters['articleId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: articleId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listArticleRecordsUsingGET_RAW_URL = function() {
  return '/articles/records'
}
export const listArticleRecordsUsingGET_TYPE = function() {
  return 'get'
}
export const listArticleRecordsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles/records'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['articleId'] !== undefined) {
    queryParameters['articleId'] = parameters['articleId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 搜索文档信息
 * request: searchArticleUsingGET
 * url: searchArticleUsingGETURL
 * method: searchArticleUsingGET_TYPE
 * raw_url: searchArticleUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param keyword - 
 */
export const searchArticleUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles/search'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const searchArticleUsingGET_RAW_URL = function() {
  return '/articles/search'
}
export const searchArticleUsingGET_TYPE = function() {
  return 'get'
}
export const searchArticleUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles/search'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取文档信息
 * request: getArticleUsingGET
 * url: getArticleUsingGETURL
 * method: getArticleUsingGET_TYPE
 * raw_url: getArticleUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 文档id
 */
export const getArticleUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getArticleUsingGET_RAW_URL = function() {
  return '/articles/{id}'
}
export const getArticleUsingGET_TYPE = function() {
  return 'get'
}
export const getArticleUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改文档
 * request: updateArticleUsingPUT
 * url: updateArticleUsingPUTURL
 * method: updateArticleUsingPUT_TYPE
 * raw_url: updateArticleUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 文档id
 * @param article - article
 */
export const updateArticleUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['article'] !== undefined) {
    body = parameters['article']
  }
  if (parameters['article'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: article'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateArticleUsingPUT_RAW_URL = function() {
  return '/articles/{id}'
}
export const updateArticleUsingPUT_TYPE = function() {
  return 'put'
}
export const updateArticleUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除文档
 * request: deleteArticleUsingDELETE
 * url: deleteArticleUsingDELETEURL
 * method: deleteArticleUsingDELETE_TYPE
 * raw_url: deleteArticleUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 文档id
 */
export const deleteArticleUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/articles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteArticleUsingDELETE_RAW_URL = function() {
  return '/articles/{id}'
}
export const deleteArticleUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteArticleUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/articles/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增目录
 * request: saveCatalogUsingPOST
 * url: saveCatalogUsingPOSTURL
 * method: saveCatalogUsingPOST_TYPE
 * raw_url: saveCatalogUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param catalog - catalog
 */
export const saveCatalogUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['catalog'] !== undefined) {
    body = parameters['catalog']
  }
  if (parameters['catalog'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: catalog'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveCatalogUsingPOST_RAW_URL = function() {
  return '/catalogs'
}
export const saveCatalogUsingPOST_TYPE = function() {
  return 'post'
}
export const saveCatalogUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取标记目录）
 * request: getCatalogMarkedUsingGET
 * url: getCatalogMarkedUsingGETURL
 * method: getCatalogMarkedUsingGET_TYPE
 * raw_url: getCatalogMarkedUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const getCatalogMarkedUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/marked'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCatalogMarkedUsingGET_RAW_URL = function() {
  return '/catalogs/marked'
}
export const getCatalogMarkedUsingGET_TYPE = function() {
  return 'get'
}
export const getCatalogMarkedUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/marked'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 排序
 * request: updateOrderUsingPUT
 * url: updateOrderUsingPUTURL
 * method: updateOrderUsingPUT_TYPE
 * raw_url: updateOrderUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param req - req
 */
export const updateOrderUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/order'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['req'] !== undefined) {
    body = parameters['req']
  }
  if (parameters['req'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: req'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrderUsingPUT_RAW_URL = function() {
  return '/catalogs/order'
}
export const updateOrderUsingPUT_TYPE = function() {
  return 'put'
}
export const updateOrderUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/order'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取目录信息）
 * request: getCatalogUsingGET
 * url: getCatalogUsingGETURL
 * method: getCatalogUsingGET_TYPE
 * raw_url: getCatalogUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 */
export const getCatalogUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCatalogUsingGET_RAW_URL = function() {
  return '/catalogs/{id}'
}
export const getCatalogUsingGET_TYPE = function() {
  return 'get'
}
export const getCatalogUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改目录
 * request: updateCatalogUsingPUT
 * url: updateCatalogUsingPUTURL
 * method: updateCatalogUsingPUT_TYPE
 * raw_url: updateCatalogUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 * @param catalog - catalog
 */
export const updateCatalogUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['catalog'] !== undefined) {
    body = parameters['catalog']
  }
  if (parameters['catalog'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: catalog'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateCatalogUsingPUT_RAW_URL = function() {
  return '/catalogs/{id}'
}
export const updateCatalogUsingPUT_TYPE = function() {
  return 'put'
}
export const updateCatalogUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除目录
 * request: deleteCatalogUsingDELETE
 * url: deleteCatalogUsingDELETEURL
 * method: deleteCatalogUsingDELETE_TYPE
 * raw_url: deleteCatalogUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 */
export const deleteCatalogUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteCatalogUsingDELETE_RAW_URL = function() {
  return '/catalogs/{id}'
}
export const deleteCatalogUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteCatalogUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取目录和文章树）
 * request: getCatalogTreeUsingGET
 * url: getCatalogTreeUsingGETURL
 * method: getCatalogTreeUsingGET_TYPE
 * raw_url: getCatalogTreeUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 分类，板块id
 */
export const getCatalogTreeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/{id}/tree'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCatalogTreeUsingGET_RAW_URL = function() {
  return '/catalogs/{id}/tree'
}
export const getCatalogTreeUsingGET_TYPE = function() {
  return 'get'
}
export const getCatalogTreeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/{id}/tree'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 给目录/文章打标
 * request: updateCatalogMarkedUsingPUT
 * url: updateCatalogMarkedUsingPUTURL
 * method: updateCatalogMarkedUsingPUT_TYPE
 * raw_url: updateCatalogMarkedUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 * @param marked - 是否标记, 1-是,0-否
 * @param type - ID类型, 1-目录,2-文章
 */
export const updateCatalogMarkedUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/catalogs/{id}/{marked}/{type}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{marked}', `${parameters['marked']}`)
  if (parameters['marked'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: marked'))
  }
  path = path.replace('{type}', `${parameters['type']}`)
  if (parameters['type'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: type'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateCatalogMarkedUsingPUT_RAW_URL = function() {
  return '/catalogs/{id}/{marked}/{type}'
}
export const updateCatalogMarkedUsingPUT_TYPE = function() {
  return 'put'
}
export const updateCatalogMarkedUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/catalogs/{id}/{marked}/{type}'
  path = path.replace('{id}', `${parameters['id']}`)
  path = path.replace('{marked}', `${parameters['marked']}`)
  path = path.replace('{type}', `${parameters['type']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取所有分类，板块
 * request: listCategoriesUsingGET
 * url: listCategoriesUsingGETURL
 * method: listCategoriesUsingGET_TYPE
 * raw_url: listCategoriesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listCategoriesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listCategoriesUsingGET_RAW_URL = function() {
  return '/categories'
}
export const listCategoriesUsingGET_TYPE = function() {
  return 'get'
}
export const listCategoriesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增分类，板块
 * request: saveCategoryUsingPOST
 * url: saveCategoryUsingPOSTURL
 * method: saveCategoryUsingPOST_TYPE
 * raw_url: saveCategoryUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param catalog - catalog
 */
export const saveCategoryUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['catalog'] !== undefined) {
    body = parameters['catalog']
  }
  if (parameters['catalog'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: catalog'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveCategoryUsingPOST_RAW_URL = function() {
  return '/categories'
}
export const saveCategoryUsingPOST_TYPE = function() {
  return 'post'
}
export const saveCategoryUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取ISV可以查看的板块(根据权限以及板块的accessType判断)
 * request: listCategoriesForViewUsingGET
 * url: listCategoriesForViewUsingGETURL
 * method: listCategoriesForViewUsingGET_TYPE
 * raw_url: listCategoriesForViewUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param isvId - 被查询的ISV ID
 */
export const listCategoriesForViewUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/auth/view/{isvId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{isvId}', `${parameters['isvId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listCategoriesForViewUsingGET_RAW_URL = function() {
  return '/categories/auth/view/{isvId}'
}
export const listCategoriesForViewUsingGET_TYPE = function() {
  return 'get'
}
export const listCategoriesForViewUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/auth/view/{isvId}'
  path = path.replace('{isvId}', `${parameters['isvId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改排序
 * request: updateCategoryOrderUsingPUT
 * url: updateCategoryOrderUsingPUTURL
 * method: updateCategoryOrderUsingPUT_TYPE
 * raw_url: updateCategoryOrderUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param req - req
 */
export const updateCategoryOrderUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/order'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['req'] !== undefined) {
    body = parameters['req']
  }
  if (parameters['req'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: req'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateCategoryOrderUsingPUT_RAW_URL = function() {
  return '/categories/order'
}
export const updateCategoryOrderUsingPUT_TYPE = function() {
  return 'put'
}
export const updateCategoryOrderUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/order'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询自己关注的板块
 * request: listCategoryWatchUsingGET
 * url: listCategoryWatchUsingGETURL
 * method: listCategoryWatchUsingGET_TYPE
 * raw_url: listCategoryWatchUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 
 * @param pageSize - allow zero
 */
export const listCategoryWatchUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/watch'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listCategoryWatchUsingGET_RAW_URL = function() {
  return '/categories/watch'
}
export const listCategoryWatchUsingGET_TYPE = function() {
  return 'get'
}
export const listCategoryWatchUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/watch'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 关注/取消关注 板块
 * request: watchCategoryUsingPUT
 * url: watchCategoryUsingPUTURL
 * method: watchCategoryUsingPUT_TYPE
 * raw_url: watchCategoryUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param categoryId - categoryId
 * @param status - 0-取消 1-关注
 */
export const watchCategoryUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/watch/{categoryId}/{status}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{categoryId}', `${parameters['categoryId']}`)
  if (parameters['categoryId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: categoryId'))
  }
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const watchCategoryUsingPUT_RAW_URL = function() {
  return '/categories/watch/{categoryId}/{status}'
}
export const watchCategoryUsingPUT_TYPE = function() {
  return 'put'
}
export const watchCategoryUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/watch/{categoryId}/{status}'
  path = path.replace('{categoryId}', `${parameters['categoryId']}`)
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取分类，板块）
 * request: getCategoryUsingGET
 * url: getCategoryUsingGETURL
 * method: getCategoryUsingGET_TYPE
 * raw_url: getCategoryUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 */
export const getCategoryUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCategoryUsingGET_RAW_URL = function() {
  return '/categories/{id}'
}
export const getCategoryUsingGET_TYPE = function() {
  return 'get'
}
export const getCategoryUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改分类，板块
 * request: updateCategoryUsingPUT
 * url: updateCategoryUsingPUTURL
 * method: updateCategoryUsingPUT_TYPE
 * raw_url: updateCategoryUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 * @param catalog - catalog
 */
export const updateCategoryUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['catalog'] !== undefined) {
    body = parameters['catalog']
  }
  if (parameters['catalog'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: catalog'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateCategoryUsingPUT_RAW_URL = function() {
  return '/categories/{id}'
}
export const updateCategoryUsingPUT_TYPE = function() {
  return 'put'
}
export const updateCategoryUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除分类，板块
 * request: deleteCategoryUsingDELETE
 * url: deleteCategoryUsingDELETEURL
 * method: deleteCategoryUsingDELETE_TYPE
 * raw_url: deleteCategoryUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 目录id
 */
export const deleteCategoryUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/categories/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteCategoryUsingDELETE_RAW_URL = function() {
  return '/categories/{id}'
}
export const deleteCategoryUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteCategoryUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/categories/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取文章评论
 * request: getCommentsByArticleIdUsingGET
 * url: getCommentsByArticleIdUsingGETURL
 * method: getCommentsByArticleIdUsingGET_TYPE
 * raw_url: getCommentsByArticleIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param articleId - 文章id
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getCommentsByArticleIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/comments'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['articleId'] !== undefined) {
    queryParameters['articleId'] = parameters['articleId']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCommentsByArticleIdUsingGET_RAW_URL = function() {
  return '/comments'
}
export const getCommentsByArticleIdUsingGET_TYPE = function() {
  return 'get'
}
export const getCommentsByArticleIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/comments'
  if (parameters['articleId'] !== undefined) {
    queryParameters['articleId'] = parameters['articleId']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 添加评论
 * request: saveCommentUsingPOST
 * url: saveCommentUsingPOSTURL
 * method: saveCommentUsingPOST_TYPE
 * raw_url: saveCommentUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param comment - comment
 */
export const saveCommentUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/comments'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['comment'] !== undefined) {
    body = parameters['comment']
  }
  if (parameters['comment'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: comment'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveCommentUsingPOST_RAW_URL = function() {
  return '/comments'
}
export const saveCommentUsingPOST_TYPE = function() {
  return 'post'
}
export const saveCommentUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/comments'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取我的评论
 * request: getCommentsByUserIdUsingGET
 * url: getCommentsByUserIdUsingGETURL
 * method: getCommentsByUserIdUsingGET_TYPE
 * raw_url: getCommentsByUserIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getCommentsByUserIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/comments/mine'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCommentsByUserIdUsingGET_RAW_URL = function() {
  return '/comments/mine'
}
export const getCommentsByUserIdUsingGET_TYPE = function() {
  return 'get'
}
export const getCommentsByUserIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/comments/mine'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除评论
 * request: deleteCommentUsingDELETE
 * url: deleteCommentUsingDELETEURL
 * method: deleteCommentUsingDELETE_TYPE
 * raw_url: deleteCommentUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 评论id
 */
export const deleteCommentUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/comments/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteCommentUsingDELETE_RAW_URL = function() {
  return '/comments/{id}'
}
export const deleteCommentUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteCommentUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/comments/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取贴吧列表
 * request: getCommunitiesUsingGET
 * url: getCommunitiesUsingGETURL
 * method: getCommunitiesUsingGET_TYPE
 * raw_url: getCommunitiesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param name - 贴吧名称
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getCommunitiesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCommunitiesUsingGET_RAW_URL = function() {
  return '/community'
}
export const getCommunitiesUsingGET_TYPE = function() {
  return 'get'
}
export const getCommunitiesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community'
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取热门贴吧
 * request: getHotCommunitiesUsingGET
 * url: getHotCommunitiesUsingGETURL
 * method: getHotCommunitiesUsingGET_TYPE
 * raw_url: getHotCommunitiesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getHotCommunitiesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/hotCommunities'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getHotCommunitiesUsingGET_RAW_URL = function() {
  return '/community/hotCommunities'
}
export const getHotCommunitiesUsingGET_TYPE = function() {
  return 'get'
}
export const getHotCommunitiesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/hotCommunities'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取最新帖子
 * request: getLastPostsUsingGET
 * url: getLastPostsUsingGETURL
 * method: getLastPostsUsingGET_TYPE
 * raw_url: getLastPostsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getLastPostsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/last'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getLastPostsUsingGET_RAW_URL = function() {
  return '/community/last'
}
export const getLastPostsUsingGET_TYPE = function() {
  return 'get'
}
export const getLastPostsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/last'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 我的帖子
 * request: getMyPostsUsingGET
 * url: getMyPostsUsingGETURL
 * method: getMyPostsUsingGET_TYPE
 * raw_url: getMyPostsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getMyPostsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/mine'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getMyPostsUsingGET_RAW_URL = function() {
  return '/community/mine'
}
export const getMyPostsUsingGET_TYPE = function() {
  return 'get'
}
export const getMyPostsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/mine'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取评论最多帖子
 * request: getMoreCommentPostsUsingGET
 * url: getMoreCommentPostsUsingGETURL
 * method: getMoreCommentPostsUsingGET_TYPE
 * raw_url: getMoreCommentPostsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getMoreCommentPostsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/moreComment'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getMoreCommentPostsUsingGET_RAW_URL = function() {
  return '/community/moreComment'
}
export const getMoreCommentPostsUsingGET_TYPE = function() {
  return 'get'
}
export const getMoreCommentPostsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/moreComment'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取贴吧详情
 * request: getCommunityDetailUsingGET
 * url: getCommunityDetailUsingGETURL
 * method: getCommunityDetailUsingGET_TYPE
 * raw_url: getCommunityDetailUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getCommunityDetailUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getCommunityDetailUsingGET_RAW_URL = function() {
  return '/community/{id}'
}
export const getCommunityDetailUsingGET_TYPE = function() {
  return 'get'
}
export const getCommunityDetailUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取贴吧最新帖子
 * request: getLastPostsByCategoryIdUsingGET
 * url: getLastPostsByCategoryIdUsingGETURL
 * method: getLastPostsByCategoryIdUsingGET_TYPE
 * raw_url: getLastPostsByCategoryIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 贴吧id
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getLastPostsByCategoryIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/{id}/last'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getLastPostsByCategoryIdUsingGET_RAW_URL = function() {
  return '/community/{id}/last'
}
export const getLastPostsByCategoryIdUsingGET_TYPE = function() {
  return 'get'
}
export const getLastPostsByCategoryIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/{id}/last'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取贴吧评论最多帖子
 * request: getMoreCommentPostsByCategoryIdUsingGET
 * url: getMoreCommentPostsByCategoryIdUsingGETURL
 * method: getMoreCommentPostsByCategoryIdUsingGET_TYPE
 * raw_url: getMoreCommentPostsByCategoryIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 贴吧id
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getMoreCommentPostsByCategoryIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/community/{id}/moreComment'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getMoreCommentPostsByCategoryIdUsingGET_RAW_URL = function() {
  return '/community/{id}/moreComment'
}
export const getMoreCommentPostsByCategoryIdUsingGET_TYPE = function() {
  return 'get'
}
export const getMoreCommentPostsByCategoryIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/community/{id}/moreComment'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 字典查询,查询全部
 * request: listDictsUsingGET_1
 * url: listDictsUsingGET_1URL
 * method: listDictsUsingGET_1_TYPE
 * raw_url: listDictsUsingGET_1_RAW_URL
 * @param jsessionid - session cookie
 */
export const listDictsUsingGET_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/dicts'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listDictsUsingGET_1_RAW_URL = function() {
  return '/dicts'
}
export const listDictsUsingGET_1_TYPE = function() {
  return 'get'
}
export const listDictsUsingGET_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/dicts'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 字典查询，查询全部
 * request: listDictsSortedUsingGET
 * url: listDictsSortedUsingGETURL
 * method: listDictsSortedUsingGET_TYPE
 * raw_url: listDictsSortedUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listDictsSortedUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/dicts/sorted'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listDictsSortedUsingGET_RAW_URL = function() {
  return '/dicts/sorted'
}
export const listDictsSortedUsingGET_TYPE = function() {
  return 'get'
}
export const listDictsSortedUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/dicts/sorted'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 字典查询，查询键对应字典
 * request: listDictsUsingGET
 * url: listDictsUsingGETURL
 * method: listDictsUsingGET_TYPE
 * raw_url: listDictsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param key - key
 */
export const listDictsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/dicts/{key}'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['key'] !== undefined) {
    queryParameters['key'] = parameters['key']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listDictsUsingGET_RAW_URL = function() {
  return '/dicts/{key}'
}
export const listDictsUsingGET_TYPE = function() {
  return 'get'
}
export const listDictsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/dicts/{key}'
  if (parameters['key'] !== undefined) {
    queryParameters['key'] = parameters['key']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 字典查询，查询键对应字典
 * request: listDictsSortedUsingGET_1
 * url: listDictsSortedUsingGET_1URL
 * method: listDictsSortedUsingGET_1_TYPE
 * raw_url: listDictsSortedUsingGET_1_RAW_URL
 * @param jsessionid - session cookie
 * @param key - key
 */
export const listDictsSortedUsingGET_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/dicts/{key}/sorted'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['key'] !== undefined) {
    queryParameters['key'] = parameters['key']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listDictsSortedUsingGET_1_RAW_URL = function() {
  return '/dicts/{key}/sorted'
}
export const listDictsSortedUsingGET_1_TYPE = function() {
  return 'get'
}
export const listDictsSortedUsingGET_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/dicts/{key}/sorted'
  if (parameters['key'] !== undefined) {
    queryParameters['key'] = parameters['key']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除文件
 * request: deleteFileUsingDELETE
 * url: deleteFileUsingDELETEURL
 * method: deleteFileUsingDELETE_TYPE
 * raw_url: deleteFileUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param path - 文件路径
 */
export const deleteFileUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/files'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters['path'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: path'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteFileUsingDELETE_RAW_URL = function() {
  return '/files'
}
export const deleteFileUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteFileUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/files'
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 批量删除文件
 * request: deleteBatchUsingDELETE
 * url: deleteBatchUsingDELETEURL
 * method: deleteBatchUsingDELETE_TYPE
 * raw_url: deleteBatchUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param paths - 文件路径
 */
export const deleteBatchUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/files/batch'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['paths'] !== undefined) {
    body = parameters['paths']
  }
  if (parameters['paths'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: paths'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteBatchUsingDELETE_RAW_URL = function() {
  return '/files/batch'
}
export const deleteBatchUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteBatchUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/files/batch'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 下载文件(Swagger下载功能有问题)
 * request: downloadFileUsingGET
 * url: downloadFileUsingGETURL
 * method: downloadFileUsingGET_TYPE
 * raw_url: downloadFileUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param path - 文件路径
 * @param isDownload - 是下载还是引用
 */
export const downloadFileUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/files/download'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters['path'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: path'))
  }
  if (parameters['isDownload'] !== undefined) {
    queryParameters['isDownload'] = parameters['isDownload']
  }
  if (parameters['isDownload'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: isDownload'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const downloadFileUsingGET_RAW_URL = function() {
  return '/files/download'
}
export const downloadFileUsingGET_TYPE = function() {
  return 'get'
}
export const downloadFileUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/files/download'
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters['isDownload'] !== undefined) {
    queryParameters['isDownload'] = parameters['isDownload']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 下载记录
 * request: listDownloadLogsUsingGET
 * url: listDownloadLogsUsingGETURL
 * method: listDownloadLogsUsingGET_TYPE
 * raw_url: listDownloadLogsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param path - 文件路径
 */
export const listDownloadLogsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/files/download/history'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listDownloadLogsUsingGET_RAW_URL = function() {
  return '/files/download/history'
}
export const listDownloadLogsUsingGET_TYPE = function() {
  return 'get'
}
export const listDownloadLogsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/files/download/history'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 上传文件
 * request: uploadFileUsingPOST
 * url: uploadFileUsingPOSTURL
 * method: uploadFileUsingPOST_TYPE
 * raw_url: uploadFileUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param categoryId - 文件所属分类,文件所在文章的分类
 * @param issueId - 文件所属工单ID
 * @param accessType - 访问类型 0-受限,1-公开
 * @param attachedType - 附属的类型：1文章,2工单,3-NDA
 * @param file - file
 */
export const uploadFileUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/files/upload'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['categoryId'] !== undefined) {
    queryParameters['categoryId'] = parameters['categoryId']
  }
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters['accessType'] !== undefined) {
    queryParameters['accessType'] = parameters['accessType']
  }
  if (parameters['accessType'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: accessType'))
  }
  if (parameters['attachedType'] !== undefined) {
    queryParameters['attachedType'] = parameters['attachedType']
  }
  if (parameters['attachedType'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: attachedType'))
  }
  if (parameters['file'] !== undefined) {
    form['file'] = parameters['file']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const uploadFileUsingPOST_RAW_URL = function() {
  return '/files/upload'
}
export const uploadFileUsingPOST_TYPE = function() {
  return 'post'
}
export const uploadFileUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/files/upload'
  if (parameters['categoryId'] !== undefined) {
    queryParameters['categoryId'] = parameters['categoryId']
  }
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters['accessType'] !== undefined) {
    queryParameters['accessType'] = parameters['accessType']
  }
  if (parameters['attachedType'] !== undefined) {
    queryParameters['attachedType'] = parameters['attachedType']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 上传记录
 * request: listUploadLogsUsingGET
 * url: listUploadLogsUsingGETURL
 * method: listUploadLogsUsingGET_TYPE
 * raw_url: listUploadLogsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param userId - 上传用户id
 * @param categoryId - 类目ID
 * @param issueId - 工单ID
 */
export const listUploadLogsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/files/upload/history'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['userId'] !== undefined) {
    queryParameters['userId'] = parameters['userId']
  }
  if (parameters['categoryId'] !== undefined) {
    queryParameters['categoryId'] = parameters['categoryId']
  }
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listUploadLogsUsingGET_RAW_URL = function() {
  return '/files/upload/history'
}
export const listUploadLogsUsingGET_TYPE = function() {
  return 'get'
}
export const listUploadLogsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/files/upload/history'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['userId'] !== undefined) {
    queryParameters['userId'] = parameters['userId']
  }
  if (parameters['categoryId'] !== undefined) {
    queryParameters['categoryId'] = parameters['categoryId']
  }
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 根据条件查询用户组
 * request: listGroupsUsingGET
 * url: listGroupsUsingGETURL
 * method: listGroupsUsingGET_TYPE
 * raw_url: listGroupsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param name - 组名
 * @param username - 用户名
 * @param type - 
 */
export const listGroupsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listGroupsUsingGET_RAW_URL = function() {
  return '/groups'
}
export const listGroupsUsingGET_TYPE = function() {
  return 'get'
}
export const listGroupsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增用户组
 * request: saveGroupUsingPOST
 * url: saveGroupUsingPOSTURL
 * method: saveGroupUsingPOST_TYPE
 * raw_url: saveGroupUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param saveGroupReq - saveGroupReq
 */
export const saveGroupUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['saveGroupReq'] !== undefined) {
    body = parameters['saveGroupReq']
  }
  if (parameters['saveGroupReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: saveGroupReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveGroupUsingPOST_RAW_URL = function() {
  return '/groups'
}
export const saveGroupUsingPOST_TYPE = function() {
  return 'post'
}
export const saveGroupUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取所有用户组
 * request: listAllGroupsUsingGET
 * url: listAllGroupsUsingGETURL
 * method: listAllGroupsUsingGET_TYPE
 * raw_url: listAllGroupsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listAllGroupsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/all'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listAllGroupsUsingGET_RAW_URL = function() {
  return '/groups/all'
}
export const listAllGroupsUsingGET_TYPE = function() {
  return 'get'
}
export const listAllGroupsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/all'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 根据条件查询用户组
 * request: existsGroupsUsingGET
 * url: existsGroupsUsingGETURL
 * method: existsGroupsUsingGET_TYPE
 * raw_url: existsGroupsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param name - 
 */
export const existsGroupsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/exists'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const existsGroupsUsingGET_RAW_URL = function() {
  return '/groups/exists'
}
export const existsGroupsUsingGET_TYPE = function() {
  return 'get'
}
export const existsGroupsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/exists'
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取用户所在用户组
 * request: listByUserIdUsingGET
 * url: listByUserIdUsingGETURL
 * method: listByUserIdUsingGET_TYPE
 * raw_url: listByUserIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param userId - userId
 */
export const listByUserIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/users/{userId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters['userId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: userId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listByUserIdUsingGET_RAW_URL = function() {
  return '/groups/users/{userId}'
}
export const listByUserIdUsingGET_TYPE = function() {
  return 'get'
}
export const listByUserIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/users/{userId}'
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取用户组详情
 * request: getByIdUsingGET
 * url: getByIdUsingGETURL
 * method: getByIdUsingGET_TYPE
 * raw_url: getByIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getByIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getByIdUsingGET_RAW_URL = function() {
  return '/groups/{id}'
}
export const getByIdUsingGET_TYPE = function() {
  return 'get'
}
export const getByIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改用户组
 * request: updateGroupUsingPUT
 * url: updateGroupUsingPUTURL
 * method: updateGroupUsingPUT_TYPE
 * raw_url: updateGroupUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param updateGroupReq - updateGroupReq
 */
export const updateGroupUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['updateGroupReq'] !== undefined) {
    body = parameters['updateGroupReq']
  }
  if (parameters['updateGroupReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: updateGroupReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateGroupUsingPUT_RAW_URL = function() {
  return '/groups/{id}'
}
export const updateGroupUsingPUT_TYPE = function() {
  return 'put'
}
export const updateGroupUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除用户组
 * request: deleteGroupUsingDELETE
 * url: deleteGroupUsingDELETEURL
 * method: deleteGroupUsingDELETE_TYPE
 * raw_url: deleteGroupUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const deleteGroupUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteGroupUsingDELETE_RAW_URL = function() {
  return '/groups/{id}'
}
export const deleteGroupUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteGroupUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改用户组成员
 * request: updateGroupUsersUsingPUT
 * url: updateGroupUsersUsingPUTURL
 * method: updateGroupUsersUsingPUT_TYPE
 * raw_url: updateGroupUsersUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param userIds - userIds
 */
export const updateGroupUsersUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/{id}/users'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['userIds'] !== undefined) {
    body = parameters['userIds']
  }
  if (parameters['userIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: userIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateGroupUsersUsingPUT_RAW_URL = function() {
  return '/groups/{id}/users'
}
export const updateGroupUsersUsingPUT_TYPE = function() {
  return 'put'
}
export const updateGroupUsersUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/{id}/users'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除用户组成员
 * request: deleteGroupUsersUsingDELETE
 * url: deleteGroupUsersUsingDELETEURL
 * method: deleteGroupUsersUsingDELETE_TYPE
 * raw_url: deleteGroupUsersUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param userIds - userIds
 */
export const deleteGroupUsersUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/groups/{id}/users'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['userIds'] !== undefined) {
    body = parameters['userIds']
  }
  if (parameters['userIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: userIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteGroupUsersUsingDELETE_RAW_URL = function() {
  return '/groups/{id}/users'
}
export const deleteGroupUsersUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteGroupUsersUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/groups/{id}/users'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询工单类型
 * request: listIssueTypesUsingGET
 * url: listIssueTypesUsingGETURL
 * method: listIssueTypesUsingGET_TYPE
 * raw_url: listIssueTypesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listIssueTypesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issueTypes'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listIssueTypesUsingGET_RAW_URL = function() {
  return '/issueTypes'
}
export const listIssueTypesUsingGET_TYPE = function() {
  return 'get'
}
export const listIssueTypesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issueTypes'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增工单类型
 * request: saveIssueTypeUsingPOST
 * url: saveIssueTypeUsingPOSTURL
 * method: saveIssueTypeUsingPOST_TYPE
 * raw_url: saveIssueTypeUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param param - param
 */
export const saveIssueTypeUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issueTypes'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveIssueTypeUsingPOST_RAW_URL = function() {
  return '/issueTypes'
}
export const saveIssueTypeUsingPOST_TYPE = function() {
  return 'post'
}
export const saveIssueTypeUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issueTypes'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询工单类型
 * request: getIssueTypeUsingGET
 * url: getIssueTypeUsingGETURL
 * method: getIssueTypeUsingGET_TYPE
 * raw_url: getIssueTypeUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getIssueTypeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issueTypes/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getIssueTypeUsingGET_RAW_URL = function() {
  return '/issueTypes/{id}'
}
export const getIssueTypeUsingGET_TYPE = function() {
  return 'get'
}
export const getIssueTypeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issueTypes/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改工单类型
 * request: updateIssueTypeUsingPUT
 * url: updateIssueTypeUsingPUTURL
 * method: updateIssueTypeUsingPUT_TYPE
 * raw_url: updateIssueTypeUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param param - param
 */
export const updateIssueTypeUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issueTypes/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateIssueTypeUsingPUT_RAW_URL = function() {
  return '/issueTypes/{id}'
}
export const updateIssueTypeUsingPUT_TYPE = function() {
  return 'put'
}
export const updateIssueTypeUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issueTypes/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除工单类型
 * request: deleteIssueTypeUsingDELETE
 * url: deleteIssueTypeUsingDELETEURL
 * method: deleteIssueTypeUsingDELETE_TYPE
 * raw_url: deleteIssueTypeUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const deleteIssueTypeUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issueTypes/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteIssueTypeUsingDELETE_RAW_URL = function() {
  return '/issueTypes/{id}'
}
export const deleteIssueTypeUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteIssueTypeUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issueTypes/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 条件查询工单
 * request: listIssuesUsingGET
 * url: listIssuesUsingGETURL
 * method: listIssuesUsingGET_TYPE
 * raw_url: listIssuesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param statuses - 状态
 * @param pageSize - 
 * @param pageNum - 
 * @param forAdmin - 是否是后台管理调用,默认true
 * @param isvId - 按isvId过滤
 * @param assigneeId - 受理人ID
 * @param title - 标题(模糊)
 * @param onlyMyWatch - 仅显示我关注的工单 1-是，0-否；默认为0
 * @param sortColumn - 排序列名, 有效字段：'PK_ID', 'CODE', 'CREATE_DATE', 默认 'PK_ID'
 * @param sortDirection - 排序方向, 有效字段：'ASC','DESC', 默认 'DESC'
 */
export const listIssuesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['statuses'] !== undefined) {
    queryParameters['statuses'] = parameters['statuses']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['forAdmin'] !== undefined) {
    queryParameters['forAdmin'] = parameters['forAdmin']
  }
  if (parameters['isvId'] !== undefined) {
    queryParameters['isvId'] = parameters['isvId']
  }
  if (parameters['assigneeId'] !== undefined) {
    queryParameters['assigneeId'] = parameters['assigneeId']
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['onlyMyWatch'] !== undefined) {
    queryParameters['onlyMyWatch'] = parameters['onlyMyWatch']
  }
  if (parameters['sortColumn'] !== undefined) {
    queryParameters['sortColumn'] = parameters['sortColumn']
  }
  if (parameters['sortDirection'] !== undefined) {
    queryParameters['sortDirection'] = parameters['sortDirection']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listIssuesUsingGET_RAW_URL = function() {
  return '/issues'
}
export const listIssuesUsingGET_TYPE = function() {
  return 'get'
}
export const listIssuesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues'
  if (parameters['statuses'] !== undefined) {
    queryParameters['statuses'] = parameters['statuses']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['forAdmin'] !== undefined) {
    queryParameters['forAdmin'] = parameters['forAdmin']
  }
  if (parameters['isvId'] !== undefined) {
    queryParameters['isvId'] = parameters['isvId']
  }
  if (parameters['assigneeId'] !== undefined) {
    queryParameters['assigneeId'] = parameters['assigneeId']
  }
  if (parameters['title'] !== undefined) {
    queryParameters['title'] = parameters['title']
  }
  if (parameters['onlyMyWatch'] !== undefined) {
    queryParameters['onlyMyWatch'] = parameters['onlyMyWatch']
  }
  if (parameters['sortColumn'] !== undefined) {
    queryParameters['sortColumn'] = parameters['sortColumn']
  }
  if (parameters['sortDirection'] !== undefined) {
    queryParameters['sortDirection'] = parameters['sortDirection']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增工单
 * request: saveIssueUsingPOST
 * url: saveIssueUsingPOSTURL
 * method: saveIssueUsingPOST_TYPE
 * raw_url: saveIssueUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param issueReq - issueReq
 */
export const saveIssueUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['issueReq'] !== undefined) {
    body = parameters['issueReq']
  }
  if (parameters['issueReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: issueReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveIssueUsingPOST_RAW_URL = function() {
  return '/issues'
}
export const saveIssueUsingPOST_TYPE = function() {
  return 'post'
}
export const saveIssueUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 分配工单
 * request: assignIssueUsingPUT
 * url: assignIssueUsingPUTURL
 * method: assignIssueUsingPUT_TYPE
 * raw_url: assignIssueUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param assigneeId - assigneeId
 */
export const assignIssueUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/assign/{id}/{assigneeId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{assigneeId}', `${parameters['assigneeId']}`)
  if (parameters['assigneeId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: assigneeId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const assignIssueUsingPUT_RAW_URL = function() {
  return '/issues/assign/{id}/{assigneeId}'
}
export const assignIssueUsingPUT_TYPE = function() {
  return 'put'
}
export const assignIssueUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/assign/{id}/{assigneeId}'
  path = path.replace('{id}', `${parameters['id']}`)
  path = path.replace('{assigneeId}', `${parameters['assigneeId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 通过Code获取工单
 * request: getIssueByCodeUsingGET
 * url: getIssueByCodeUsingGETURL
 * method: getIssueByCodeUsingGET_TYPE
 * raw_url: getIssueByCodeUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param code - code
 */
export const getIssueByCodeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/code/{code}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getIssueByCodeUsingGET_RAW_URL = function() {
  return '/issues/code/{code}'
}
export const getIssueByCodeUsingGET_TYPE = function() {
  return 'get'
}
export const getIssueByCodeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/code/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 统计工单按状态
 * request: countIssueStatusUsingGET
 * url: countIssueStatusUsingGETURL
 * method: countIssueStatusUsingGET_TYPE
 * raw_url: countIssueStatusUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const countIssueStatusUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/count/status'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const countIssueStatusUsingGET_RAW_URL = function() {
  return '/issues/count/status'
}
export const countIssueStatusUsingGET_TYPE = function() {
  return 'get'
}
export const countIssueStatusUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/count/status'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询工单修改记录
 * request: listRecordUsingGET
 * url: listRecordUsingGETURL
 * method: listRecordUsingGET_TYPE
 * raw_url: listRecordUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageSize - 
 * @param pageNum - 
 * @param issueId - 
 * @param valueType - 值类型 1-status, 2-assigneeId
 */
export const listRecordUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/record'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters['issueId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: issueId'))
  }
  if (parameters['valueType'] !== undefined) {
    queryParameters['valueType'] = parameters['valueType']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listRecordUsingGET_RAW_URL = function() {
  return '/issues/record'
}
export const listRecordUsingGET_TYPE = function() {
  return 'get'
}
export const listRecordUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/record'
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters['valueType'] !== undefined) {
    queryParameters['valueType'] = parameters['valueType']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 关注/取消关注 工单
 * request: watchIssueUsingPUT
 * url: watchIssueUsingPUTURL
 * method: watchIssueUsingPUT_TYPE
 * raw_url: watchIssueUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param issueId - issueId
 * @param status - 0-取消 1-关注
 */
export const watchIssueUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/watch/{issueId}/{status}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{issueId}', `${parameters['issueId']}`)
  if (parameters['issueId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: issueId'))
  }
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const watchIssueUsingPUT_RAW_URL = function() {
  return '/issues/watch/{issueId}/{status}'
}
export const watchIssueUsingPUT_TYPE = function() {
  return 'put'
}
export const watchIssueUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/watch/{issueId}/{status}'
  path = path.replace('{issueId}', `${parameters['issueId']}`)
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 工单详情
 * request: getIssueUsingGET
 * url: getIssueUsingGETURL
 * method: getIssueUsingGET_TYPE
 * raw_url: getIssueUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getIssueUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getIssueUsingGET_RAW_URL = function() {
  return '/issues/{id}'
}
export const getIssueUsingGET_TYPE = function() {
  return 'get'
}
export const getIssueUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改工单
 * request: updateIssueUsingPUT
 * url: updateIssueUsingPUTURL
 * method: updateIssueUsingPUT_TYPE
 * raw_url: updateIssueUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param issueReq - issueReq
 */
export const updateIssueUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['issueReq'] !== undefined) {
    body = parameters['issueReq']
  }
  if (parameters['issueReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: issueReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateIssueUsingPUT_RAW_URL = function() {
  return '/issues/{id}'
}
export const updateIssueUsingPUT_TYPE = function() {
  return 'put'
}
export const updateIssueUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改工单状态
 * request: updateIssueStatusUsingPUT
 * url: updateIssueStatusUsingPUTURL
 * method: updateIssueStatusUsingPUT_TYPE
 * raw_url: updateIssueStatusUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param status - status
 */
export const updateIssueStatusUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/issues/{id}/{status}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateIssueStatusUsingPUT_RAW_URL = function() {
  return '/issues/{id}/{status}'
}
export const updateIssueStatusUsingPUT_TYPE = function() {
  return 'put'
}
export const updateIssueStatusUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/issues/{id}/{status}'
  path = path.replace('{id}', `${parameters['id']}`)
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * ISV列表
 * request: listIsvUsingGET
 * url: listIsvUsingGETURL
 * method: listIsvUsingGET_TYPE
 * raw_url: listIsvUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param dictIds - info字典ID
 * @param pageNum - 
 * @param pageSize - 
 * @param companyName - 公司名称
 * @param salesId - 销售ID
 * @param salesEngineerId - 销售工程师ID
 * @param supportId - 支持人员ID
 * @param posSystemName - pos系统名称
 * @param ndaStatus - 审核状态 0-待审核，1-通过，2-拒绝
 */
export const listIsvUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['dictIds'] !== undefined) {
    queryParameters['dictIds'] = parameters['dictIds']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['companyName'] !== undefined) {
    queryParameters['companyName'] = parameters['companyName']
  }
  if (parameters['salesId'] !== undefined) {
    queryParameters['salesId'] = parameters['salesId']
  }
  if (parameters['salesEngineerId'] !== undefined) {
    queryParameters['salesEngineerId'] = parameters['salesEngineerId']
  }
  if (parameters['supportId'] !== undefined) {
    queryParameters['supportId'] = parameters['supportId']
  }
  if (parameters['posSystemName'] !== undefined) {
    queryParameters['posSystemName'] = parameters['posSystemName']
  }
  if (parameters['ndaStatus'] !== undefined) {
    queryParameters['ndaStatus'] = parameters['ndaStatus']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listIsvUsingGET_RAW_URL = function() {
  return '/isv'
}
export const listIsvUsingGET_TYPE = function() {
  return 'get'
}
export const listIsvUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv'
  if (parameters['dictIds'] !== undefined) {
    queryParameters['dictIds'] = parameters['dictIds']
  }
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['companyName'] !== undefined) {
    queryParameters['companyName'] = parameters['companyName']
  }
  if (parameters['salesId'] !== undefined) {
    queryParameters['salesId'] = parameters['salesId']
  }
  if (parameters['salesEngineerId'] !== undefined) {
    queryParameters['salesEngineerId'] = parameters['salesEngineerId']
  }
  if (parameters['supportId'] !== undefined) {
    queryParameters['supportId'] = parameters['supportId']
  }
  if (parameters['posSystemName'] !== undefined) {
    queryParameters['posSystemName'] = parameters['posSystemName']
  }
  if (parameters['ndaStatus'] !== undefined) {
    queryParameters['ndaStatus'] = parameters['ndaStatus']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增ISV
 * request: saveIsvUsingPOST
 * url: saveIsvUsingPOSTURL
 * method: saveIsvUsingPOST_TYPE
 * raw_url: saveIsvUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param req - req
 */
export const saveIsvUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['req'] !== undefined) {
    body = parameters['req']
  }
  if (parameters['req'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: req'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveIsvUsingPOST_RAW_URL = function() {
  return '/isv'
}
export const saveIsvUsingPOST_TYPE = function() {
  return 'post'
}
export const saveIsvUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更新ISV
 * request: updateIsvUsingPUT
 * url: updateIsvUsingPUTURL
 * method: updateIsvUsingPUT_TYPE
 * raw_url: updateIsvUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param req - req
 */
export const updateIsvUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['req'] !== undefined) {
    body = parameters['req']
  }
  if (parameters['req'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: req'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateIsvUsingPUT_RAW_URL = function() {
  return '/isv'
}
export const updateIsvUsingPUT_TYPE = function() {
  return 'put'
}
export const updateIsvUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * ISV 基础信息列表
 * request: listIsvBaseInfoUsingGET
 * url: listIsvBaseInfoUsingGETURL
 * method: listIsvBaseInfoUsingGET_TYPE
 * raw_url: listIsvBaseInfoUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listIsvBaseInfoUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/baseInfo'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listIsvBaseInfoUsingGET_RAW_URL = function() {
  return '/isv/baseInfo'
}
export const listIsvBaseInfoUsingGET_TYPE = function() {
  return 'get'
}
export const listIsvBaseInfoUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/baseInfo'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 检查ISV是否已存在
 * request: checkExistUsingGET
 * url: checkExistUsingGETURL
 * method: checkExistUsingGET_TYPE
 * raw_url: checkExistUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param companyName - companyName
 */
export const checkExistUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/checkExist'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['companyName'] !== undefined) {
    queryParameters['companyName'] = parameters['companyName']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const checkExistUsingGET_RAW_URL = function() {
  return '/isv/checkExist'
}
export const checkExistUsingGET_TYPE = function() {
  return 'get'
}
export const checkExistUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/checkExist'
  if (parameters['companyName'] !== undefined) {
    queryParameters['companyName'] = parameters['companyName']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * ISV详情
 * request: getIsvByCodeUsingGET
 * url: getIsvByCodeUsingGETURL
 * method: getIsvByCodeUsingGET_TYPE
 * raw_url: getIsvByCodeUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param code - code
 */
export const getIsvByCodeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/code/{code}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: code'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getIsvByCodeUsingGET_RAW_URL = function() {
  return '/isv/code/{code}'
}
export const getIsvByCodeUsingGET_TYPE = function() {
  return 'get'
}
export const getIsvByCodeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/code/{code}'
  path = path.replace('{code}', `${parameters['code']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * ISV 扩展信息列表
 * request: listIsvExtendInfoUsingGET
 * url: listIsvExtendInfoUsingGETURL
 * method: listIsvExtendInfoUsingGET_TYPE
 * raw_url: listIsvExtendInfoUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const listIsvExtendInfoUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/extendInfo/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listIsvExtendInfoUsingGET_RAW_URL = function() {
  return '/isv/extendInfo/{id}'
}
export const listIsvExtendInfoUsingGET_TYPE = function() {
  return 'get'
}
export const listIsvExtendInfoUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/extendInfo/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更新ISV扩展信息
 * request: updateExtendIsvInfoUsingPUT
 * url: updateExtendIsvInfoUsingPUTURL
 * method: updateExtendIsvInfoUsingPUT_TYPE
 * raw_url: updateExtendIsvInfoUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param isvDictIds - 数组,如 [1,2]
 */
export const updateExtendIsvInfoUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/extendInfo/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['isvDictIds'] !== undefined) {
    body = parameters['isvDictIds']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateExtendIsvInfoUsingPUT_RAW_URL = function() {
  return '/isv/extendInfo/{id}'
}
export const updateExtendIsvInfoUsingPUT_TYPE = function() {
  return 'put'
}
export const updateExtendIsvInfoUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/extendInfo/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取NDA
 * request: getLastIsvNdaUsingGET
 * url: getLastIsvNdaUsingGETURL
 * method: getLastIsvNdaUsingGET_TYPE
 * raw_url: getLastIsvNdaUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const getLastIsvNdaUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/nda'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getLastIsvNdaUsingGET_RAW_URL = function() {
  return '/isv/nda'
}
export const getLastIsvNdaUsingGET_TYPE = function() {
  return 'get'
}
export const getLastIsvNdaUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/nda'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改NDA
 * request: updateIsvNdaUsingPUT
 * url: updateIsvNdaUsingPUTURL
 * method: updateIsvNdaUsingPUT_TYPE
 * raw_url: updateIsvNdaUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param req - req
 */
export const updateIsvNdaUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/nda'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['req'] !== undefined) {
    body = parameters['req']
  }
  if (parameters['req'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: req'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateIsvNdaUsingPUT_RAW_URL = function() {
  return '/isv/nda'
}
export const updateIsvNdaUsingPUT_TYPE = function() {
  return 'put'
}
export const updateIsvNdaUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/nda'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * ISV详情
 * request: getIsvUsingGET
 * url: getIsvUsingGETURL
 * method: getIsvUsingGET_TYPE
 * raw_url: getIsvUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getIsvUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getIsvUsingGET_RAW_URL = function() {
  return '/isv/{id}'
}
export const getIsvUsingGET_TYPE = function() {
  return 'get'
}
export const getIsvUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 更新ISV审核状态 
 * request: updateIsvStatusUsingPUT
 * url: updateIsvStatusUsingPUTURL
 * method: updateIsvStatusUsingPUT_TYPE
 * raw_url: updateIsvStatusUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param status - 1-同意，2-拒绝
 * @param rejectReason - 拒绝理由
 */
export const updateIsvStatusUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/isv/{id}/{status}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters['rejectReason'] !== undefined) {
    queryParameters['rejectReason'] = parameters['rejectReason']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateIsvStatusUsingPUT_RAW_URL = function() {
  return '/isv/{id}/{status}'
}
export const updateIsvStatusUsingPUT_TYPE = function() {
  return 'put'
}
export const updateIsvStatusUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/isv/{id}/{status}'
  path = path.replace('{id}', `${parameters['id']}`)
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters['rejectReason'] !== undefined) {
    queryParameters['rejectReason'] = parameters['rejectReason']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 登录接口
 * request: loginUsingPOST
 * url: loginUsingPOSTURL
 * method: loginUsingPOST_TYPE
 * raw_url: loginUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param verifyCode - 
 * @param username - 
 * @param password - 
 */
export const loginUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/login'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['verifyCode'] !== undefined) {
    form['verifyCode'] = parameters['verifyCode']
  }
  if (parameters['verifyCode'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: verifyCode'))
  }
  if (parameters['username'] !== undefined) {
    form['username'] = parameters['username']
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    form['password'] = parameters['password']
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: password'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const loginUsingPOST_RAW_URL = function() {
  return '/login'
}
export const loginUsingPOST_TYPE = function() {
  return 'post'
}
export const loginUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/login'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 登录错误
 * request: loginErrorUsingPOST
 * url: loginErrorUsingPOSTURL
 * method: loginErrorUsingPOST_TYPE
 * raw_url: loginErrorUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 */
export const loginErrorUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/login/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const loginErrorUsingPOST_RAW_URL = function() {
  return '/login/error'
}
export const loginErrorUsingPOST_TYPE = function() {
  return 'post'
}
export const loginErrorUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/login/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 注销
 * request: logoutUsingPOST
 * url: logoutUsingPOSTURL
 * method: logoutUsingPOST_TYPE
 * raw_url: logoutUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 */
export const logoutUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/logout'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const logoutUsingPOST_RAW_URL = function() {
  return '/logout'
}
export const logoutUsingPOST_TYPE = function() {
  return 'post'
}
export const logoutUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/logout'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * listPermissions
 * request: listPermissionsUsingGET_1
 * url: listPermissionsUsingGET_1URL
 * method: listPermissionsUsingGET_1_TYPE
 * raw_url: listPermissionsUsingGET_1_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param permissionName - 
 * @param moduleName - 
 * @param type - 
 * @param orderByName - 
 */
export const listPermissionsUsingGET_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['permissionName'] !== undefined) {
    queryParameters['permissionName'] = parameters['permissionName']
  }
  if (parameters['moduleName'] !== undefined) {
    queryParameters['moduleName'] = parameters['moduleName']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters['orderByName'] !== undefined) {
    queryParameters['orderByName'] = parameters['orderByName']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listPermissionsUsingGET_1_RAW_URL = function() {
  return '/permissions'
}
export const listPermissionsUsingGET_1_TYPE = function() {
  return 'get'
}
export const listPermissionsUsingGET_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['permissionName'] !== undefined) {
    queryParameters['permissionName'] = parameters['permissionName']
  }
  if (parameters['moduleName'] !== undefined) {
    queryParameters['moduleName'] = parameters['moduleName']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters['orderByName'] !== undefined) {
    queryParameters['orderByName'] = parameters['orderByName']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * listAllPermissions
 * request: listAllPermissionsUsingGET
 * url: listAllPermissionsUsingGETURL
 * method: listAllPermissionsUsingGET_TYPE
 * raw_url: listAllPermissionsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listAllPermissionsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/all'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listAllPermissionsUsingGET_RAW_URL = function() {
  return '/permissions/all'
}
export const listAllPermissionsUsingGET_TYPE = function() {
  return 'get'
}
export const listAllPermissionsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/all'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询权限
 * request: listPermissionUsingGET
 * url: listPermissionUsingGETURL
 * method: listPermissionUsingGET_TYPE
 * raw_url: listPermissionUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param subjectIds - subjectIds
 */
export const listPermissionUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/categories'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['subjectIds'] !== undefined) {
    queryParameters['subjectIds'] = parameters['subjectIds']
  }
  if (parameters['subjectIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: subjectIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listPermissionUsingGET_RAW_URL = function() {
  return '/permissions/categories'
}
export const listPermissionUsingGET_TYPE = function() {
  return 'get'
}
export const listPermissionUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/categories'
  if (parameters['subjectIds'] !== undefined) {
    queryParameters['subjectIds'] = parameters['subjectIds']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 撤销权限
 * request: deletePermissionsUsingDELETE
 * url: deletePermissionsUsingDELETEURL
 * method: deletePermissionsUsingDELETE_TYPE
 * raw_url: deletePermissionsUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param ids - ids
 */
export const deletePermissionsUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/categories'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['ids'] !== undefined) {
    queryParameters['ids'] = parameters['ids']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deletePermissionsUsingDELETE_RAW_URL = function() {
  return '/permissions/categories'
}
export const deletePermissionsUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deletePermissionsUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/categories'
  if (parameters['ids'] !== undefined) {
    queryParameters['ids'] = parameters['ids']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询权限
 * request: listPermissionsUsingGET
 * url: listPermissionsUsingGETURL
 * method: listPermissionsUsingGET_TYPE
 * raw_url: listPermissionsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param module - module
 */
export const listPermissionsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/categories/{module}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{module}', `${parameters['module']}`)
  if (parameters['module'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: module'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listPermissionsUsingGET_RAW_URL = function() {
  return '/permissions/categories/{module}'
}
export const listPermissionsUsingGET_TYPE = function() {
  return 'get'
}
export const listPermissionsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/categories/{module}'
  path = path.replace('{module}', `${parameters['module']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 授予权限
 * request: savePermissionsUsingPOST
 * url: savePermissionsUsingPOSTURL
 * method: savePermissionsUsingPOST_TYPE
 * raw_url: savePermissionsUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param module - module
 * @param permissionReqs - permissionReqs
 */
export const savePermissionsUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/categories/{module}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{module}', `${parameters['module']}`)
  if (parameters['module'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: module'))
  }
  if (parameters['permissionReqs'] !== undefined) {
    body = parameters['permissionReqs']
  }
  if (parameters['permissionReqs'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: permissionReqs'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const savePermissionsUsingPOST_RAW_URL = function() {
  return '/permissions/categories/{module}'
}
export const savePermissionsUsingPOST_TYPE = function() {
  return 'post'
}
export const savePermissionsUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/categories/{module}'
  path = path.replace('{module}', `${parameters['module']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 授予权限
 * request: savePermissionsUsingPOST_1
 * url: savePermissionsUsingPOST_1URL
 * method: savePermissionsUsingPOST_1_TYPE
 * raw_url: savePermissionsUsingPOST_1_RAW_URL
 * @param jsessionid - session cookie
 * @param subjectType -  授权主体类型  1角色，2组，3用户
 * @param subjectId - 主体标识
 * @param modules - modules
 */
export const savePermissionsUsingPOST_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/categories/{subjectType}/{subjectId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{subjectType}', `${parameters['subjectType']}`)
  path = path.replace('{subjectId}', `${parameters['subjectId']}`)
  if (parameters['modules'] !== undefined) {
    body = parameters['modules']
  }
  if (parameters['modules'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: modules'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const savePermissionsUsingPOST_1_RAW_URL = function() {
  return '/permissions/categories/{subjectType}/{subjectId}'
}
export const savePermissionsUsingPOST_1_TYPE = function() {
  return 'post'
}
export const savePermissionsUsingPOST_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/categories/{subjectType}/{subjectId}'
  path = path.replace('{subjectType}', `${parameters['subjectType']}`)
  path = path.replace('{subjectId}', `${parameters['subjectId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * listRolePermissions
 * request: listRolePermissionsUsingGET
 * url: listRolePermissionsUsingGETURL
 * method: listRolePermissionsUsingGET_TYPE
 * raw_url: listRolePermissionsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param roleId - roleId
 */
export const listRolePermissionsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/roles/{roleId}/permissions'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters['roleId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listRolePermissionsUsingGET_RAW_URL = function() {
  return '/permissions/roles/{roleId}/permissions'
}
export const listRolePermissionsUsingGET_TYPE = function() {
  return 'get'
}
export const listRolePermissionsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/roles/{roleId}/permissions'
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * saveRolePermissions
 * request: saveRolePermissionsUsingPOST
 * url: saveRolePermissionsUsingPOSTURL
 * method: saveRolePermissionsUsingPOST_TYPE
 * raw_url: saveRolePermissionsUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param roleId - roleId
 * @param permissionIds - permissionIds
 */
export const saveRolePermissionsUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/roles/{roleId}/permissions'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters['roleId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleId'))
  }
  if (parameters['permissionIds'] !== undefined) {
    body = parameters['permissionIds']
  }
  if (parameters['permissionIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: permissionIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveRolePermissionsUsingPOST_RAW_URL = function() {
  return '/permissions/roles/{roleId}/permissions'
}
export const saveRolePermissionsUsingPOST_TYPE = function() {
  return 'post'
}
export const saveRolePermissionsUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/roles/{roleId}/permissions'
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * updateRolePermissions
 * request: updateRolePermissionsUsingPUT
 * url: updateRolePermissionsUsingPUTURL
 * method: updateRolePermissionsUsingPUT_TYPE
 * raw_url: updateRolePermissionsUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param roleId - roleId
 * @param permissionIds - permissionIds
 */
export const updateRolePermissionsUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/roles/{roleId}/permissions'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters['roleId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleId'))
  }
  if (parameters['permissionIds'] !== undefined) {
    body = parameters['permissionIds']
  }
  if (parameters['permissionIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: permissionIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateRolePermissionsUsingPUT_RAW_URL = function() {
  return '/permissions/roles/{roleId}/permissions'
}
export const updateRolePermissionsUsingPUT_TYPE = function() {
  return 'put'
}
export const updateRolePermissionsUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/roles/{roleId}/permissions'
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * deleteRolePermissions
 * request: deleteRolePermissionsUsingDELETE
 * url: deleteRolePermissionsUsingDELETEURL
 * method: deleteRolePermissionsUsingDELETE_TYPE
 * raw_url: deleteRolePermissionsUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param roleId - roleId
 * @param permissionIds - permissionIds
 */
export const deleteRolePermissionsUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/permissions/roles/{roleId}/permissions'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters['roleId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleId'))
  }
  if (parameters['permissionIds'] !== undefined) {
    body = parameters['permissionIds']
  }
  if (parameters['permissionIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: permissionIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteRolePermissionsUsingDELETE_RAW_URL = function() {
  return '/permissions/roles/{roleId}/permissions'
}
export const deleteRolePermissionsUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteRolePermissionsUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/permissions/roles/{roleId}/permissions'
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取机型
 * request: getProductsUsingGET
 * url: getProductsUsingGETURL
 * method: getProductsUsingGET_TYPE
 * raw_url: getProductsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getProductsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/product'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getProductsUsingGET_RAW_URL = function() {
  return '/product'
}
export const getProductsUsingGET_TYPE = function() {
  return 'get'
}
export const getProductsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/product'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 保存机型
 * request: saveProductsUsingPOST
 * url: saveProductsUsingPOSTURL
 * method: saveProductsUsingPOST_TYPE
 * raw_url: saveProductsUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param product - product
 */
export const saveProductsUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/product'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['product'] !== undefined) {
    body = parameters['product']
  }
  if (parameters['product'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: product'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveProductsUsingPOST_RAW_URL = function() {
  return '/product'
}
export const saveProductsUsingPOST_TYPE = function() {
  return 'post'
}
export const saveProductsUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/product'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改机型
 * request: updateProductsUsingPUT
 * url: updateProductsUsingPUTURL
 * method: updateProductsUsingPUT_TYPE
 * raw_url: updateProductsUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param product - product
 * @param id - id
 */
export const updateProductsUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/product/{id}'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['product'] !== undefined) {
    body = parameters['product']
  }
  if (parameters['product'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: product'))
  }
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateProductsUsingPUT_RAW_URL = function() {
  return '/product/{id}'
}
export const updateProductsUsingPUT_TYPE = function() {
  return 'put'
}
export const updateProductsUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/product/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除机型
 * request: deleteProductsUsingDELETE
 * url: deleteProductsUsingDELETEURL
 * method: deleteProductsUsingDELETE_TYPE
 * raw_url: deleteProductsUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const deleteProductsUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/product/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteProductsUsingDELETE_RAW_URL = function() {
  return '/product/{id}'
}
export const deleteProductsUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteProductsUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/product/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取机型组分页数据
 * request: getPageUsingGET
 * url: getPageUsingGETURL
 * method: getPageUsingGET_TYPE
 * raw_url: getPageUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const getPageUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/productgroup'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getPageUsingGET_RAW_URL = function() {
  return '/productgroup'
}
export const getPageUsingGET_TYPE = function() {
  return 'get'
}
export const getPageUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/productgroup'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 保存机型组
 * request: saveUsingPOST
 * url: saveUsingPOSTURL
 * method: saveUsingPOST_TYPE
 * raw_url: saveUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param productGroup - productGroup
 */
export const saveUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/productgroup'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['productGroup'] !== undefined) {
    body = parameters['productGroup']
  }
  if (parameters['productGroup'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: productGroup'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveUsingPOST_RAW_URL = function() {
  return '/productgroup'
}
export const saveUsingPOST_TYPE = function() {
  return 'post'
}
export const saveUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/productgroup'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取所有机型组
 * request: getAllUsingGET
 * url: getAllUsingGETURL
 * method: getAllUsingGET_TYPE
 * raw_url: getAllUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const getAllUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/productgroup/all'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getAllUsingGET_RAW_URL = function() {
  return '/productgroup/all'
}
export const getAllUsingGET_TYPE = function() {
  return 'get'
}
export const getAllUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/productgroup/all'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改机型组
 * request: updateUsingPUT
 * url: updateUsingPUTURL
 * method: updateUsingPUT_TYPE
 * raw_url: updateUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param productGroup - productGroup
 */
export const updateUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/productgroup/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['productGroup'] !== undefined) {
    body = parameters['productGroup']
  }
  if (parameters['productGroup'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: productGroup'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateUsingPUT_RAW_URL = function() {
  return '/productgroup/{id}'
}
export const updateUsingPUT_TYPE = function() {
  return 'put'
}
export const updateUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/productgroup/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除机型组
 * request: updateUsingDELETE
 * url: updateUsingDELETEURL
 * method: updateUsingDELETE_TYPE
 * raw_url: updateUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - 机型组id
 */
export const updateUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/productgroup/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const updateUsingDELETE_RAW_URL = function() {
  return '/productgroup/{id}'
}
export const updateUsingDELETE_TYPE = function() {
  return 'delete'
}
export const updateUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/productgroup/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询工单回复
 * request: listRepliesUsingGET
 * url: listRepliesUsingGETURL
 * method: listRepliesUsingGET_TYPE
 * raw_url: listRepliesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param issueId - issueId
 */
export const listRepliesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/replies'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters['issueId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: issueId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listRepliesUsingGET_RAW_URL = function() {
  return '/replies'
}
export const listRepliesUsingGET_TYPE = function() {
  return 'get'
}
export const listRepliesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/replies'
  if (parameters['issueId'] !== undefined) {
    queryParameters['issueId'] = parameters['issueId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增工单回复
 * request: saveReplyUsingPOST
 * url: saveReplyUsingPOSTURL
 * method: saveReplyUsingPOST_TYPE
 * raw_url: saveReplyUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param replyReq - replyReq
 */
export const saveReplyUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/replies'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['replyReq'] !== undefined) {
    body = parameters['replyReq']
  }
  if (parameters['replyReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: replyReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveReplyUsingPOST_RAW_URL = function() {
  return '/replies'
}
export const saveReplyUsingPOST_TYPE = function() {
  return 'post'
}
export const saveReplyUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/replies'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询工单回复
 * request: getReplyUsingGET
 * url: getReplyUsingGETURL
 * method: getReplyUsingGET_TYPE
 * raw_url: getReplyUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getReplyUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/replies/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getReplyUsingGET_RAW_URL = function() {
  return '/replies/{id}'
}
export const getReplyUsingGET_TYPE = function() {
  return 'get'
}
export const getReplyUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/replies/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改工单回复
 * request: updateReplyUsingPUT
 * url: updateReplyUsingPUTURL
 * method: updateReplyUsingPUT_TYPE
 * raw_url: updateReplyUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param replyReq - replyReq
 */
export const updateReplyUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/replies/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['replyReq'] !== undefined) {
    body = parameters['replyReq']
  }
  if (parameters['replyReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: replyReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateReplyUsingPUT_RAW_URL = function() {
  return '/replies/{id}'
}
export const updateReplyUsingPUT_TYPE = function() {
  return 'put'
}
export const updateReplyUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/replies/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除工单回复
 * request: deleteReplyUsingDELETE
 * url: deleteReplyUsingDELETEURL
 * method: deleteReplyUsingDELETE_TYPE
 * raw_url: deleteReplyUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const deleteReplyUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/replies/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteReplyUsingDELETE_RAW_URL = function() {
  return '/replies/{id}'
}
export const deleteReplyUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteReplyUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/replies/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询角色
 * request: listRolesUsingGET
 * url: listRolesUsingGETURL
 * method: listRolesUsingGET_TYPE
 * raw_url: listRolesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param name - 
 * @param type - 
 */
export const listRolesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listRolesUsingGET_RAW_URL = function() {
  return '/roles'
}
export const listRolesUsingGET_TYPE = function() {
  return 'get'
}
export const listRolesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles'
  if (parameters['name'] !== undefined) {
    queryParameters['name'] = parameters['name']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增角色
 * request: saveRoleUsingPOST
 * url: saveRoleUsingPOSTURL
 * method: saveRoleUsingPOST_TYPE
 * raw_url: saveRoleUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param saveRoleReq - saveRoleReq
 */
export const saveRoleUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['saveRoleReq'] !== undefined) {
    body = parameters['saveRoleReq']
  }
  if (parameters['saveRoleReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: saveRoleReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveRoleUsingPOST_RAW_URL = function() {
  return '/roles'
}
export const saveRoleUsingPOST_TYPE = function() {
  return 'post'
}
export const saveRoleUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取所有角色
 * request: listAllRolesUsingGET
 * url: listAllRolesUsingGETURL
 * method: listAllRolesUsingGET_TYPE
 * raw_url: listAllRolesUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const listAllRolesUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/all'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listAllRolesUsingGET_RAW_URL = function() {
  return '/roles/all'
}
export const listAllRolesUsingGET_TYPE = function() {
  return 'get'
}
export const listAllRolesUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/all'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取用户组角色
 * request: listByGroupIdUsingGET
 * url: listByGroupIdUsingGETURL
 * method: listByGroupIdUsingGET_TYPE
 * raw_url: listByGroupIdUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param groupId - groupId
 */
export const listByGroupIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/groups/{groupId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{groupId}', `${parameters['groupId']}`)
  if (parameters['groupId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: groupId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listByGroupIdUsingGET_RAW_URL = function() {
  return '/roles/groups/{groupId}'
}
export const listByGroupIdUsingGET_TYPE = function() {
  return 'get'
}
export const listByGroupIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/groups/{groupId}'
  path = path.replace('{groupId}', `${parameters['groupId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 赋予用户组角色
 * request: updateGroupRolesUsingPUT
 * url: updateGroupRolesUsingPUTURL
 * method: updateGroupRolesUsingPUT_TYPE
 * raw_url: updateGroupRolesUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param groupId - groupId
 * @param roleIds - roleIds
 */
export const updateGroupRolesUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/groups/{groupId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{groupId}', `${parameters['groupId']}`)
  if (parameters['groupId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: groupId'))
  }
  if (parameters['roleIds'] !== undefined) {
    body = parameters['roleIds']
  }
  if (parameters['roleIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateGroupRolesUsingPUT_RAW_URL = function() {
  return '/roles/groups/{groupId}'
}
export const updateGroupRolesUsingPUT_TYPE = function() {
  return 'put'
}
export const updateGroupRolesUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/groups/{groupId}'
  path = path.replace('{groupId}', `${parameters['groupId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除用户组角色
 * request: deleteGroupRolesUsingDELETE
 * url: deleteGroupRolesUsingDELETEURL
 * method: deleteGroupRolesUsingDELETE_TYPE
 * raw_url: deleteGroupRolesUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param groupId - groupId
 * @param roleIds - roleIds
 */
export const deleteGroupRolesUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/groups/{groupId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{groupId}', `${parameters['groupId']}`)
  if (parameters['groupId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: groupId'))
  }
  if (parameters['roleIds'] !== undefined) {
    body = parameters['roleIds']
  }
  if (parameters['roleIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteGroupRolesUsingDELETE_RAW_URL = function() {
  return '/roles/groups/{groupId}'
}
export const deleteGroupRolesUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteGroupRolesUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/groups/{groupId}'
  path = path.replace('{groupId}', `${parameters['groupId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取用户角色
 * request: listByUserIdUsingGET_1
 * url: listByUserIdUsingGET_1URL
 * method: listByUserIdUsingGET_1_TYPE
 * raw_url: listByUserIdUsingGET_1_RAW_URL
 * @param jsessionid - session cookie
 * @param userId - userId
 */
export const listByUserIdUsingGET_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/users/{userId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters['userId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: userId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listByUserIdUsingGET_1_RAW_URL = function() {
  return '/roles/users/{userId}'
}
export const listByUserIdUsingGET_1_TYPE = function() {
  return 'get'
}
export const listByUserIdUsingGET_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/users/{userId}'
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 赋予用户角色
 * request: updateUserRolesUsingPUT
 * url: updateUserRolesUsingPUTURL
 * method: updateUserRolesUsingPUT_TYPE
 * raw_url: updateUserRolesUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param userId - userId
 * @param roleIds - roleIds
 */
export const updateUserRolesUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/users/{userId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters['userId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: userId'))
  }
  if (parameters['roleIds'] !== undefined) {
    body = parameters['roleIds']
  }
  if (parameters['roleIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateUserRolesUsingPUT_RAW_URL = function() {
  return '/roles/users/{userId}'
}
export const updateUserRolesUsingPUT_TYPE = function() {
  return 'put'
}
export const updateUserRolesUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/users/{userId}'
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除用户角色
 * request: deleteUserRolesUsingDELETE
 * url: deleteUserRolesUsingDELETEURL
 * method: deleteUserRolesUsingDELETE_TYPE
 * raw_url: deleteUserRolesUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param userId - userId
 * @param roleIds - roleIds
 */
export const deleteUserRolesUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/users/{userId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters['userId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: userId'))
  }
  if (parameters['roleIds'] !== undefined) {
    body = parameters['roleIds']
  }
  if (parameters['roleIds'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleIds'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteUserRolesUsingDELETE_RAW_URL = function() {
  return '/roles/users/{userId}'
}
export const deleteUserRolesUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteUserRolesUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/users/{userId}'
  path = path.replace('{userId}', `${parameters['userId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改角色
 * request: updateRoleUsingPUT
 * url: updateRoleUsingPUTURL
 * method: updateRoleUsingPUT_TYPE
 * raw_url: updateRoleUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param updateRoleReq - updateRoleReq
 */
export const updateRoleUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['updateRoleReq'] !== undefined) {
    body = parameters['updateRoleReq']
  }
  if (parameters['updateRoleReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: updateRoleReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateRoleUsingPUT_RAW_URL = function() {
  return '/roles/{id}'
}
export const updateRoleUsingPUT_TYPE = function() {
  return 'put'
}
export const updateRoleUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除角色
 * request: deleteRoleUsingDELETE
 * url: deleteRoleUsingDELETEURL
 * method: deleteRoleUsingDELETE_TYPE
 * raw_url: deleteRoleUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const deleteRoleUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteRoleUsingDELETE_RAW_URL = function() {
  return '/roles/{id}'
}
export const deleteRoleUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteRoleUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/roles/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询触发器
 * request: listTriggersUsingGET
 * url: listTriggersUsingGETURL
 * method: listTriggersUsingGET_TYPE
 * raw_url: listTriggersUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param type - 触发器类型：0事件触发，1定时触发
 * @param enabled - 触发器启停 ：0未启用  ，1启用   ，null全部
 */
export const listTriggersUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters['type'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: type'))
  }
  if (parameters['enabled'] !== undefined) {
    queryParameters['enabled'] = parameters['enabled']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listTriggersUsingGET_RAW_URL = function() {
  return '/triggers'
}
export const listTriggersUsingGET_TYPE = function() {
  return 'get'
}
export const listTriggersUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers'
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters['enabled'] !== undefined) {
    queryParameters['enabled'] = parameters['enabled']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增触发器
 * request: saveTriggerUsingPOST
 * url: saveTriggerUsingPOSTURL
 * method: saveTriggerUsingPOST_TYPE
 * raw_url: saveTriggerUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param trigger - trigger
 */
export const saveTriggerUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['trigger'] !== undefined) {
    body = parameters['trigger']
  }
  if (parameters['trigger'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: trigger'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveTriggerUsingPOST_RAW_URL = function() {
  return '/triggers'
}
export const saveTriggerUsingPOST_TYPE = function() {
  return 'post'
}
export const saveTriggerUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 触发器字典
 * request: listDictsUsingGET_2
 * url: listDictsUsingGET_2URL
 * method: listDictsUsingGET_2_TYPE
 * raw_url: listDictsUsingGET_2_RAW_URL
 * @param jsessionid - session cookie
 * @param type - 触发器类型：0事件触发，1定时触发
 * @param actioned - 字典类型： 0条件，1动作
 */
export const listDictsUsingGET_2 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers/dicts'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters['actioned'] !== undefined) {
    queryParameters['actioned'] = parameters['actioned']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listDictsUsingGET_2_RAW_URL = function() {
  return '/triggers/dicts'
}
export const listDictsUsingGET_2_TYPE = function() {
  return 'get'
}
export const listDictsUsingGET_2URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers/dicts'
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters['actioned'] !== undefined) {
    queryParameters['actioned'] = parameters['actioned']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查看触发器
 * request: getTriggerUsingGET
 * url: getTriggerUsingGETURL
 * method: getTriggerUsingGET_TYPE
 * raw_url: getTriggerUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getTriggerUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getTriggerUsingGET_RAW_URL = function() {
  return '/triggers/{id}'
}
export const getTriggerUsingGET_TYPE = function() {
  return 'get'
}
export const getTriggerUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改触发器
 * request: updateTriggerUsingPUT
 * url: updateTriggerUsingPUTURL
 * method: updateTriggerUsingPUT_TYPE
 * raw_url: updateTriggerUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param trigger - trigger
 */
export const updateTriggerUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['trigger'] !== undefined) {
    body = parameters['trigger']
  }
  if (parameters['trigger'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: trigger'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateTriggerUsingPUT_RAW_URL = function() {
  return '/triggers/{id}'
}
export const updateTriggerUsingPUT_TYPE = function() {
  return 'put'
}
export const updateTriggerUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 删除触发器
 * request: deleteTriggerUsingDELETE
 * url: deleteTriggerUsingDELETEURL
 * method: deleteTriggerUsingDELETE_TYPE
 * raw_url: deleteTriggerUsingDELETE_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const deleteTriggerUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteTriggerUsingDELETE_RAW_URL = function() {
  return '/triggers/{id}'
}
export const deleteTriggerUsingDELETE_TYPE = function() {
  return 'delete'
}
export const deleteTriggerUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改触发器启停状态
 * request: updateTriggerEnabledUsingPUT
 * url: updateTriggerEnabledUsingPUTURL
 * method: updateTriggerEnabledUsingPUT_TYPE
 * raw_url: updateTriggerEnabledUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param enabled - enabled
 */
export const updateTriggerEnabledUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/triggers/{id}/{enabled}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{enabled}', `${parameters['enabled']}`)
  if (parameters['enabled'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: enabled'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateTriggerEnabledUsingPUT_RAW_URL = function() {
  return '/triggers/{id}/{enabled}'
}
export const updateTriggerEnabledUsingPUT_TYPE = function() {
  return 'put'
}
export const updateTriggerEnabledUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/triggers/{id}/{enabled}'
  path = path.replace('{id}', `${parameters['id']}`)
  path = path.replace('{enabled}', `${parameters['enabled']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询用户
 * request: userListUsingGET
 * url: userListUsingGETURL
 * method: userListUsingGET_TYPE
 * raw_url: userListUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 * @param id - 用户id
 * @param username - 用户名
 * @param realName - 
 * @param clientId - 
 * @param clientName - 
 * @param number - 
 * @param email - 
 * @param orderByUsername - 
 * @param type - 用户类型： 1 pax、2 client
 */
export const userListUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['realName'] !== undefined) {
    queryParameters['realName'] = parameters['realName']
  }
  if (parameters['clientId'] !== undefined) {
    queryParameters['clientId'] = parameters['clientId']
  }
  if (parameters['clientName'] !== undefined) {
    queryParameters['clientName'] = parameters['clientName']
  }
  if (parameters['number'] !== undefined) {
    queryParameters['number'] = parameters['number']
  }
  if (parameters['email'] !== undefined) {
    queryParameters['email'] = parameters['email']
  }
  if (parameters['orderByUsername'] !== undefined) {
    queryParameters['orderByUsername'] = parameters['orderByUsername']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const userListUsingGET_RAW_URL = function() {
  return '/users'
}
export const userListUsingGET_TYPE = function() {
  return 'get'
}
export const userListUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['realName'] !== undefined) {
    queryParameters['realName'] = parameters['realName']
  }
  if (parameters['clientId'] !== undefined) {
    queryParameters['clientId'] = parameters['clientId']
  }
  if (parameters['clientName'] !== undefined) {
    queryParameters['clientName'] = parameters['clientName']
  }
  if (parameters['number'] !== undefined) {
    queryParameters['number'] = parameters['number']
  }
  if (parameters['email'] !== undefined) {
    queryParameters['email'] = parameters['email']
  }
  if (parameters['orderByUsername'] !== undefined) {
    queryParameters['orderByUsername'] = parameters['orderByUsername']
  }
  if (parameters['type'] !== undefined) {
    queryParameters['type'] = parameters['type']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 新增用户
 * request: saveUserUsingPOST
 * url: saveUserUsingPOSTURL
 * method: saveUserUsingPOST_TYPE
 * raw_url: saveUserUsingPOST_RAW_URL
 * @param jsessionid - session cookie
 * @param saveUserReq - saveUserReq
 */
export const saveUserUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['saveUserReq'] !== undefined) {
    body = parameters['saveUserReq']
  }
  if (parameters['saveUserReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: saveUserReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const saveUserUsingPOST_RAW_URL = function() {
  return '/users'
}
export const saveUserUsingPOST_TYPE = function() {
  return 'post'
}
export const saveUserUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询本代理商用户，该接口供isv admin使用
 * request: listClientUsersUsingGET
 * url: listClientUsersUsingGETURL
 * method: listClientUsersUsingGET_TYPE
 * raw_url: listClientUsersUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param pageNum - 页码，默认1
 * @param pageSize - 页大小，默认10
 */
export const listClientUsersUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/client'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const listClientUsersUsingGET_RAW_URL = function() {
  return '/users/client'
}
export const listClientUsersUsingGET_TYPE = function() {
  return 'get'
}
export const listClientUsersUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/client'
  if (parameters['pageNum'] !== undefined) {
    queryParameters['pageNum'] = parameters['pageNum']
  }
  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 禁用整个ISV的用户
 * request: disableUserByIsvIdUsingPUT
 * url: disableUserByIsvIdUsingPUTURL
 * method: disableUserByIsvIdUsingPUT_TYPE
 * raw_url: disableUserByIsvIdUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param isvId - isvId
 */
export const disableUserByIsvIdUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/disableByIsv/{isvId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{isvId}', `${parameters['isvId']}`)
  if (parameters['isvId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: isvId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const disableUserByIsvIdUsingPUT_RAW_URL = function() {
  return '/users/disableByIsv/{isvId}'
}
export const disableUserByIsvIdUsingPUT_TYPE = function() {
  return 'put'
}
export const disableUserByIsvIdUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/disableByIsv/{isvId}'
  path = path.replace('{isvId}', `${parameters['isvId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询是否存在用户
 * request: existsUsersUsingGET
 * url: existsUsersUsingGETURL
 * method: existsUsersUsingGET_TYPE
 * raw_url: existsUsersUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param username - 
 * @param email - 
 */
export const existsUsersUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/exists'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['email'] !== undefined) {
    queryParameters['email'] = parameters['email']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const existsUsersUsingGET_RAW_URL = function() {
  return '/users/exists'
}
export const existsUsersUsingGET_TYPE = function() {
  return 'get'
}
export const existsUsersUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/exists'
  if (parameters['username'] !== undefined) {
    queryParameters['username'] = parameters['username']
  }
  if (parameters['email'] !== undefined) {
    queryParameters['email'] = parameters['email']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 找回密码
 * request: forgotPasswordUsingPUT
 * url: forgotPasswordUsingPUTURL
 * method: forgotPasswordUsingPUT_TYPE
 * raw_url: forgotPasswordUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param email - 
 */
export const forgotPasswordUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/forgotPassword'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['email'] !== undefined) {
    queryParameters['email'] = parameters['email']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const forgotPasswordUsingPUT_RAW_URL = function() {
  return '/users/forgotPassword'
}
export const forgotPasswordUsingPUT_TYPE = function() {
  return 'put'
}
export const forgotPasswordUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/forgotPassword'
  if (parameters['email'] !== undefined) {
    queryParameters['email'] = parameters['email']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 单个ISV内用户ID和RealName映射
 * request: isvUserIdRealNameUsingGET
 * url: isvUserIdRealNameUsingGETURL
 * method: isvUserIdRealNameUsingGET_TYPE
 * raw_url: isvUserIdRealNameUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param isvId - isvId
 */
export const isvUserIdRealNameUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/isvRealNameMap'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['isvId'] !== undefined) {
    queryParameters['isvId'] = parameters['isvId']
  }
  if (parameters['isvId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: isvId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const isvUserIdRealNameUsingGET_RAW_URL = function() {
  return '/users/isvRealNameMap'
}
export const isvUserIdRealNameUsingGET_TYPE = function() {
  return 'get'
}
export const isvUserIdRealNameUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/isvRealNameMap'
  if (parameters['isvId'] !== undefined) {
    queryParameters['isvId'] = parameters['isvId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取当前用户信息
 * request: getMineUserUsingGET
 * url: getMineUserUsingGETURL
 * method: getMineUserUsingGET_TYPE
 * raw_url: getMineUserUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const getMineUserUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/mine'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getMineUserUsingGET_RAW_URL = function() {
  return '/users/mine'
}
export const getMineUserUsingGET_TYPE = function() {
  return 'get'
}
export const getMineUserUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/mine'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取当前用户信息，包含角色、组、权限
 * request: getMineUserDetailsUsingGET
 * url: getMineUserDetailsUsingGETURL
 * method: getMineUserDetailsUsingGET_TYPE
 * raw_url: getMineUserDetailsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const getMineUserDetailsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/mine/details'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getMineUserDetailsUsingGET_RAW_URL = function() {
  return '/users/mine/details'
}
export const getMineUserDetailsUsingGET_TYPE = function() {
  return 'get'
}
export const getMineUserDetailsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/mine/details'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * PAX用户ID和RealName映射
 * request: paxUserIdRealNameUsingGET
 * url: paxUserIdRealNameUsingGETURL
 * method: paxUserIdRealNameUsingGET_TYPE
 * raw_url: paxUserIdRealNameUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const paxUserIdRealNameUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/paxRealNameMap'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const paxUserIdRealNameUsingGET_RAW_URL = function() {
  return '/users/paxRealNameMap'
}
export const paxUserIdRealNameUsingGET_TYPE = function() {
  return 'get'
}
export const paxUserIdRealNameUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/paxRealNameMap'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 按角色查询pax用户，不分页
 * request: userByRoleUsingGET
 * url: userByRoleUsingGETURL
 * method: userByRoleUsingGET_TYPE
 * raw_url: userByRoleUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param roleId - roleId
 */
export const userByRoleUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/paxRole/{roleId}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters['roleId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: roleId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const userByRoleUsingGET_RAW_URL = function() {
  return '/users/paxRole/{roleId}'
}
export const userByRoleUsingGET_TYPE = function() {
  return 'get'
}
export const userByRoleUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/paxRole/{roleId}'
  path = path.replace('{roleId}', `${parameters['roleId']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改头像
 * request: updateAvatarUsingPUT
 * url: updateAvatarUsingPUTURL
 * method: updateAvatarUsingPUT_TYPE
 * raw_url: updateAvatarUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param path - path
 */
export const updateAvatarUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/updateAvatar'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters['path'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: path'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateAvatarUsingPUT_RAW_URL = function() {
  return '/users/updateAvatar'
}
export const updateAvatarUsingPUT_TYPE = function() {
  return 'put'
}
export const updateAvatarUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/updateAvatar'
  if (parameters['path'] !== undefined) {
    queryParameters['path'] = parameters['path']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改用户
 * request: updateUserUsingPUT_1
 * url: updateUserUsingPUT_1URL
 * method: updateUserUsingPUT_1_TYPE
 * raw_url: updateUserUsingPUT_1_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param updateUserReq - updateUserReq
 */
export const updateUserUsingPUT_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['updateUserReq'] !== undefined) {
    body = parameters['updateUserReq']
  }
  if (parameters['updateUserReq'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: updateUserReq'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateUserUsingPUT_1_RAW_URL = function() {
  return '/users/{id}'
}
export const updateUserUsingPUT_1_TYPE = function() {
  return 'put'
}
export const updateUserUsingPUT_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取用户信息
 * request: getUserDetailsUsingGET
 * url: getUserDetailsUsingGETURL
 * method: getUserDetailsUsingGET_TYPE
 * raw_url: getUserDetailsUsingGET_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const getUserDetailsUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/{id}/details'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getUserDetailsUsingGET_RAW_URL = function() {
  return '/users/{id}/details'
}
export const getUserDetailsUsingGET_TYPE = function() {
  return 'get'
}
export const getUserDetailsUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/{id}/details'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改密码
 * request: updateUserPasswordUsingPUT
 * url: updateUserPasswordUsingPUTURL
 * method: updateUserPasswordUsingPUT_TYPE
 * raw_url: updateUserPasswordUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param updatePassword - updatePassword
 */
export const updateUserPasswordUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/{id}/password'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['updatePassword'] !== undefined) {
    body = parameters['updatePassword']
  }
  if (parameters['updatePassword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: updatePassword'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateUserPasswordUsingPUT_RAW_URL = function() {
  return '/users/{id}/password'
}
export const updateUserPasswordUsingPUT_TYPE = function() {
  return 'put'
}
export const updateUserPasswordUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/{id}/password'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 重置密码
 * request: resetUserPasswordUsingPUT
 * url: resetUserPasswordUsingPUTURL
 * method: resetUserPasswordUsingPUT_TYPE
 * raw_url: resetUserPasswordUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 */
export const resetUserPasswordUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/{id}/password/reset'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const resetUserPasswordUsingPUT_RAW_URL = function() {
  return '/users/{id}/password/reset'
}
export const resetUserPasswordUsingPUT_TYPE = function() {
  return 'put'
}
export const resetUserPasswordUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/{id}/password/reset'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 修改用户状态
 * request: updateUserUsingPUT
 * url: updateUserUsingPUTURL
 * method: updateUserUsingPUT_TYPE
 * raw_url: updateUserUsingPUT_RAW_URL
 * @param jsessionid - session cookie
 * @param id - id
 * @param status - status
 */
export const updateUserUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/users/{id}/{status}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters['status'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: status'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const updateUserUsingPUT_RAW_URL = function() {
  return '/users/{id}/{status}'
}
export const updateUserUsingPUT_TYPE = function() {
  return 'put'
}
export const updateUserUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/users/{id}/{status}'
  path = path.replace('{id}', `${parameters['id']}`)
  path = path.replace('{status}', `${parameters['status']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 验证码
 * request: createCodeUsingGET
 * url: createCodeUsingGETURL
 * method: createCodeUsingGET_TYPE
 * raw_url: createCodeUsingGET_RAW_URL
 * @param jsessionid - session cookie
 */
export const createCodeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/verifyCode'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const createCodeUsingGET_RAW_URL = function() {
  return '/verifyCode'
}
export const createCodeUsingGET_TYPE = function() {
  return 'get'
}
export const createCodeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/verifyCode'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}