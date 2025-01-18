import { PetStoreOrderService, PetStoreWishlistService, ReviewService } from '$lib/services'
import { redirect } from '@sveltejs/kit'

export async function load({ parent, url }) {
	const { me, sid, storeId, origin } = await parent()

	if (!me) {
		redirect(307, `/auth/login?ref=${url.pathname}${url.search}`)
	}

	let orders = []
	let wishlists = []
	let reviews = []

	const promises = [
		PetStoreOrderService.fetchOrders(me.token),
		PetStoreWishlistService.fetchWishlist(me.token),
		// ReviewService.fetchReviews({
		// 	origin,
		// 	sid,
		// 	storeId
		// })
	]

	await Promise.allSettled(promises).then((results) => {
		const res1 = results[0]
		const res2 = results[1]
		const res3 = results[2]
		orders = res1.value
    wishlists = res2.value
	})

	return { orders, wishlists, reviews }
}
