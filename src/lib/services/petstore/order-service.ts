import { getAPI, post } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const updateAddress = async (token: string, address_id) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('order/address?id=' + address_id, {}, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('order-service update address: ', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
