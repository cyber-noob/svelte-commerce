import { error, redirect } from '@sveltejs/kit'
import { CartService, PaymentMethodService, PetStoreCartService } from '$lib/services'

export const prerender = false

export async function load({ url, parent }) {
	const { me, sid, store, storeId, origin, cartId } = await parent()
	const currentPage = +url.searchParams.get('page') || 1
	const q = url.searchParams.get('q') || ''
	let err

	try {
		const cart = await PetStoreCartService.fetchCart(me.token)

    const paymentMethods = [{
      id: 'Razorpay'
    }]

		if (!cart?.quantity) {
			redirect(307, '/cart')
		}

		return {
			cart,
			currentPage,
			err,
			paymentMethods,
			q,
			url: url.href
		}
	} catch (e) {
		if (e.status === 307 && e.location === '/cart') {
			redirect(307, '/cart')
		} else if (e.status === 401 || e.status === 307) {
      console.log('payment-methods cart +page.ts: ', e)
			redirect(307, `/auth/login?ref=${url?.pathname}`)
		} else {
			error(500, e?.message)
		}
	}
}
