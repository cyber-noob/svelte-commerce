import { error, redirect } from '@sveltejs/kit'
import { OrdersService, PetStoreOrderService } from '$lib/services'
import type { Cart } from 'lib/types'

export async function load({ cookies, locals }) {
  const {me} = locals

	try {
		const res = await PetStoreOrderService.fetchOrders(me.token)

		if (res)
      return {
        orders: res
      }
	} catch (e) {
		redirect(307, '/auth/login')
	}

	error(404, 'Orders not found')
}
