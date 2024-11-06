import { getAPI } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

const isServer = import.meta.env.SSR

export const fetchWishlist = async (token: string) => {
  try {

    const res =  getAPI('wishlist/items', PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch address', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
