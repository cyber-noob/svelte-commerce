import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const fetchHome = async () => {
  try {
    let categories = {}
    let res: any = {}

    res = await getAPI('pdp/home', 'http://localhost:8082')

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
