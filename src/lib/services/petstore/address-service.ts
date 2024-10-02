import { del, getAPI, post } from 'lib/utils'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const fetchAddresses = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('user/address/list', 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch address', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchCountries = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('user/address/countries', 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch countries', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchStates = async (token: string, country_code: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('user/address/states?country_code=' + country_code, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch countries', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchCities = async (token: string, state: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('user/address/cities?state=' + state, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service fetch city', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const deleteAddresses = async (token: string, id: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await del('user/address/remove?id=' + id, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service delete address', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const addAddress = async (token: string, body: {}) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('user/address/add', body, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service add address', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const editAddress = async (token: string, address_id: string, body: {}) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('user/address/update?id=' + address_id, body, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('address-service add address', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
