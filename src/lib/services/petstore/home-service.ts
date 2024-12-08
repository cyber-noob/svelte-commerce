import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

const isServer = import.meta.env.SSR

export const fetchHome = async () => {
  try {
    let categories = {}
    let res: any = {}

    res = await getAPI('pdp/homeJson', PUBLIC_PETSTORE_MONOLITH)

    if (res?.categories?.length) {
      categories = res?.categories
    }

    return {
      brands: res?.brands,
      categories,
      html: res?.html,
      page: res?.page,
      trending: res?.trending,
      youMayLike: res?.youMayLike
    }
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
