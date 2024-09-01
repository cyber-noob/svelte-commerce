import { CountryService } from '$lib/services'
import Cookie from 'cookie-universal'

export const prerender = false

export async function load({ parent }) {
	const { store } = await parent()
	let countries = []

	// countries = await CountryService.fetchCountries({
	// 	storeId: store,
	// 	server: isServer,
	// 	origin
	// })

	return {
    countries,
    me: Cookie().get('me')
  }
}
