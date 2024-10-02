import { CartService, PetStoreCartService } from '$lib/services'
import { writable } from 'svelte/store'
import Cookie from 'cookie-universal'

export const cartStore = writable({})
export const cartLoadingStore = writable(false)

let loadingForCart = false

export const getCartFromStore = async ({ origin, storeId, cartId, forceUpdate = false }) => {
	let existingCart

	cartStore.subscribe((value) => {
		if (value?.items?.length && Object.values(value)?.length) {
			existingCart = value
		}
	})

	if ((!loadingForCart && !existingCart) || !!forceUpdate) {
		loadingForCart = true
		cartLoadingStore.update((u) => true)
		try {
			const cartDataFromServer = await PetStoreCartService.fetchCart(Cookie().get('me').token)
			cartStore.update((u) => cartDataFromServer)
      console.log('cart store state updated ....')
		} catch (e) {
			console.log('error', e)
		} finally {
			loadingForCart = false
			cartLoadingStore.update((u) => false)
      console.log('cartLoadingStore store state updated ....')
		}
	}

	return existingCart
}

export const updateCartStore = async ({ data }) => {
	cartStore.update((u) => data)
  console.log('updateCartStore completed...')
	return true
}
