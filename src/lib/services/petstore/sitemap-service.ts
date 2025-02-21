import { getAPI } from 'lib/utils'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'
import { error } from '@sveltejs/kit'

export const fetchProducts = async () => {
  try {
    let res: any = {}

    res = await getAPI('sitemap/products', PUBLIC_PETSTORE_MONOLITH)

    console.log('sitemap-service all products', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchBlogs = async () => {
  try {
    let res: any = {}

    res = await getAPI('sitemap/blogs', PUBLIC_PETSTORE_MONOLITH)

    console.log('sitemap-service all blogs', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
