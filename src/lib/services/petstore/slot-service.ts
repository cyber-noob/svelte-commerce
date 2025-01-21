import { del, getAPI, post } from 'lib/utils'
import { error } from '@sveltejs/kit'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'
import { goto } from '$app/navigation'

const isServer = import.meta.env.SSR

export const fetchSlots = async (token: string, seller_id: string, date: string) => {
  try {
    console.log('date d: ', date)
    const res =  await getAPI('slot?seller-id=' + seller_id + '&date=' + date, PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('slot-service fetch slots: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    goto(`/auth/login?ref=${window.location?.pathname}`)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const reserveSlot = async (token: string, seller_id: string, date: string, slot: string) => {
  try {
    console.log('date d: ', date)
    const res =  await post('slot/reserve?seller-id=' + seller_id + '&date=' + date + '&slot=' + slot, {}, PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('slot-service reserve slots: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

