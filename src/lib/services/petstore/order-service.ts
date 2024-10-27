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

export const createOrder = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('order/', {}, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('order-service create order: ', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const validatePayment = async (token: string, body: {}) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('order/payment', body, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('order-service validate payment: ', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchOrders = async (token: string, params: {} = {}) => {
  try {
    let res: any = {}

    console.log('token: ', token)

    let queryParams = ''
    for (let paramsKey in params) {
      queryParams += paramsKey + '=' + params[paramsKey]
      queryParams += '&'
    }

    queryParams = queryParams.slice(0, -1)

    res = await getAPI('order/orders?' + queryParams, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('order-service customer orders: ', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
