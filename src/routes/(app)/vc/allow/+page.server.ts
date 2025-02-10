import {PetStoreVideoCallService} from 'lib/services'
import { redirect } from '@sveltejs/kit';

const isServer = import.meta.env.SSR

export const load = async ({ locals, url }) => {
  const { me } = locals
  const id = url.searchParams.get('id');
  const order_id = url.searchParams.get('order_id');

  let allowParticipant =  await PetStoreVideoCallService.allowParticipant(me.token, {
    id: id,
    order_id: order_id,
  })

  if (allowParticipant.allowed)
    redirect(302, allowParticipant.url)

  return {
    allowParticipant,
    vc_order_id: order_id,
    participant_id: id,
  }
}
