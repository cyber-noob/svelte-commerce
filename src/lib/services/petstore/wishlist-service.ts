import { getAPI, post } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

const isServer = import.meta.env.SSR

export const fetchWishlist = async (token: string) => {
  try {

    const res =  getAPI('wishlist/itemsJson', PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch address', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const addToWishlist = async (token: string, body: {}) => {
  try {
    let res: any = {}

    console.log('body: ', body)
    res = await post('wishlist/add', body, PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('wishlist-service add to wishlist', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
