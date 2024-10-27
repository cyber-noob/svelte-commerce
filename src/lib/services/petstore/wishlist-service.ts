import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const fetchWishlist = async (token: string) => {
  try {

    const res =  getAPI('wishlist/items', 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch address', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
