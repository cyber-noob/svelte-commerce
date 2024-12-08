import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'


const isServer = import.meta.env.SSR

export const fetchProductDetails = async (slug) => {
  try {
    // return await getAPI('pdp/details?slug=' + slug, PUBLIC_PETSTORE_MONOLITH)
    return await getAPI('pdp/detailsJson?slug=' + slug, PUBLIC_PETSTORE_MONOLITH)
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
