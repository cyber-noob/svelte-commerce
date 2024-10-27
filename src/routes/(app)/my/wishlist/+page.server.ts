import { error, redirect } from '@sveltejs/kit'
import { PetStoreWishlistService, WishlistService } from '$lib/services'

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

const toggleWishlist = async ({ request, cookies, locals }) => {
	const data = await request.formData()

	const pid = data.get('pid')
	const vid = data.get('vid')

	const { me, origin, sid, storeId } = locals

	if (!me || !sid) {
		redirect(307, `/auth/login?ref=/my/wishlist/add/${pid}`)
	}
	try {
		const res = await WishlistService.toggleWishlistService({
			pid: pid,
			vid: vid,
			origin: locals.origin,
			sid: cookies.get('connect.sid'),
			storeId: locals.storeId
		})

		return res
	} catch (e) {
		if (e.status === 401 || e.status === 403) {
			redirect(307, '/auth/login')
		}

		error(e.status, e.message)
	}
}

export const actions = { toggleWishlist }
