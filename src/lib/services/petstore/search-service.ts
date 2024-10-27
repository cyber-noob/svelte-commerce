import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const search = async (params: {}) => {
  try {

    let queryParams = ''
    for (let paramsKey in params) {
      queryParams += paramsKey + '=' + params[paramsKey]
      queryParams += '&'
    }

    queryParams = queryParams.slice(0, -1)

    const res = await getAPI('search/products?' + queryParams, 'http://localhost:8082')
    console.log('search results:\n', res)

    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
