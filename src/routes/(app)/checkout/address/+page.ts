import { error, redirect } from '@sveltejs/kit'
import { AddressService, CartService, CountryService, PetStoreAddressService, PetStoreCartService } from '$lib/services'

export const prerender = false

export async function load({ url, parent }) {
	const { me, sid, store, storeId, origin, cartId } = await parent()

	try {
		const currentPage = +url.searchParams.get('page') || 1
		const q = url.searchParams.get('q') || ''
		let err

		const [cart, countries] = await Promise.all([
			PetStoreCartService.fetchCart(me.token),
			PetStoreAddressService.fetchCountries(me.token)
		])

		if (!cart.quantity) {
			redirect(307, '/cart')
		}

		if (store?.isGuestCheckout) {
			if (me) {
				const { myAddresses, preSelectedAddress } = await PetStoreAddressService.fetchAddresses(me.token)

				return {
					cart,
					countries,
					currentPage,
					err,
					myAddresses,
					q,
					preSelectedAddress,
					url: url.href
				}
			} else {
				return {
					cart,
					countries,
					currentPage,
					err,
					q,
					url: url.href
				}
			}
		} else {
			if (!me) {
				redirect(307, `/auth/login?ref=${url?.pathname}`)
			} else {
				let myAddresses = await PetStoreAddressService.fetchAddresses(me.token)
        let preSelectedAddress = myAddresses.filter(address => address.is_default == 1)[0]

        console.log('checkout +page.ts: \n', myAddresses, '\npreSelectedAddress', preSelectedAddress)
				return {
					cart,
					countries,
					currentPage,
					err,
					myAddresses,
					q,
					preSelectedAddress,
					url: url.href
				}
			}
		}
	} catch (e) {
		if (e.status === 307 && e.location === '/cart') {
			redirect(307, '/cart')
		} else if (e.status === 401 || e.status === 307) {
			redirect(307, `/auth/login?ref=${url?.pathname}`)
		} else {
			error(500, e?.message)
		}
	}
}
