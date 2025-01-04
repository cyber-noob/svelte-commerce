import { getAPI } from 'lib/utils'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'
import { error } from '@sveltejs/kit'

const isServer = import.meta.env.SSR

export const allowParticipant = async (token: string, params: {}) => {
  try {

    const res =  await getAPI('vc/allow?id=' + params.id + '&order_id=' + params.order_id, PUBLIC_PETSTORE_MONOLITH, {
      "Authorization": `Bearer ${token}`
    })

    console.log('vc-service allow participant: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
