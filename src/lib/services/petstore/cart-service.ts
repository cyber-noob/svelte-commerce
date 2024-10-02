import { getAPI, post } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const fetchCart = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('cart/items', 'http://localhost:8082', {
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
    res = await post('cart/item?option=' + options, body, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('cart-service add to cart', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
