import { getAPI } from 'lib/utils'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'
import { error } from '@sveltejs/kit'

export const fetchblog = async (slug: string) => {
  try {
    let res: any = {}

    res = await getAPI('blog?slug=' + slug, PUBLIC_PETSTORE_MONOLITH)

    console.log('blog-service fetch blog', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchlatest = async () => {
  try {
    let res: any = {}

    res = await getAPI('blog/latest', PUBLIC_PETSTORE_MONOLITH)

    console.log('blog-service latest blog', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
