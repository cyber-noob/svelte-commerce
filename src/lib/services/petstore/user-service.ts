import { getAPI, post, put } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

const isServer = import.meta.env.SSR

export const addUser = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await post('user/profile/connection', {}, PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log(res)

    const firstName = res?.name.split(' ')[0]
    const lastName = res?.name.split(' ')[1]

    let me = {
      id: res?.id,
      email: res?.mail,
      phone: res?.phone,
      firstName: firstName,
      lastName: lastName,
      avatar: res.picture,
      role: res?.role,
      verified: res?.verified || true,
      active: res?.active || true,
      token: token
    }

    return me
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchUser = async (token: string) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await getAPI('user/profile/fetch', PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('user-service fetch user', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const updateUser = async (token: string, body: any) => {
  try {
    let res: any = {}

    console.log('token: ', token)
    res = await put('user/profile/update', body, 'http://localhost:8082', {
      "Authorization": `Bearer ${token}`
    })

    console.log('user-service update user', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
