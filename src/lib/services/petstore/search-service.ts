import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

const isServer = import.meta.env.SSR

export const search = async (params: {}) => {
  try {

    let queryParams = ''
    for (let paramsKey in params) {
      queryParams += paramsKey + '=' + params[paramsKey]
      queryParams += '&'
    }

    queryParams = queryParams.slice(0, -1)

    const res = await getAPI('search/products?' + queryParams, PUBLIC_PETSTORE_MONOLITH)
    console.log('search results:\n', res)

    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const popularSearch = async () => {
  try {

    const res = await getAPI('search/popular', PUBLIC_PETSTORE_MONOLITH)
    console.log('search results:\n', res)

    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchAllPetBreeds = async () => {
  try {

    const res = await getAPI('search/petBreeds', PUBLIC_PETSTORE_MONOLITH)
    console.log('search results:\n', res)

    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
