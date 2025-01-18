import { getAPI, post } from 'lib/utils'
import { error, redirect } from '@sveltejs/kit'

// const isServer = import.meta.env.SSR
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

export const fetchCart = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('cart/itemsJson', PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('cart-service fetch cart', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const addToCart = async (token: string, options, body: {}) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('cart/itemJson?option=' + options, body, PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('cart-service add to cart', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
