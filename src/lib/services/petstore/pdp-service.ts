import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const fetchProductDetails = async (slug) => {
  try {
    return getAPI('pdp/details?slug=' + slug, 'http://localhost:8082')
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
