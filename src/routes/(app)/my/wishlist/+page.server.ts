import { error, redirect } from '@sveltejs/kit'
import { PetStoreWishlistService, WishlistService } from '$lib/services'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'

export async function load({ cookies, locals, url }) {
	try {
		const { me, origin, sid, store, storeId } = locals

		if (!me) {
			redirect(307, `/auth/login?ref=${url.pathname}${url.search}`)
		}

		const wishlistedProducts = await PetStoreWishlistService.fetchWishlist(me.token)

		if (wishlistedProducts)
      return {
        wishlistedProducts: wishlistedProducts
      }
	} catch (e) {
		if (e.status === 401 || e.status === 403) {
      redirect(307, `/auth/login?ref=${url.pathname}${url.search}`)
		}

		error(e.status, e.message)
	} finally {
	}
}

const toggleWishlist = async ({ url, request, cookies, locals }) => {
	const data = await request.formData()

	const pid = data.get('pid')

	const { me, origin, sid, storeId } = locals

	if (!me) {
		redirect(307, `/auth/login?ref=/my/wishlist/add/${pid}`)
	}
	try {
		const res = await PetStoreWishlistService.addToWishlist(me.token, {
      "product_id": pid
    })

		return res
	} catch (e) {
		if (e.status === 401 || e.status === 403) {
			redirect(307, `/auth/login?ref=${url?.pathname}`)
		}

		error(e.status, e.message)
	}
}

export const actions = { toggleWishlist }
