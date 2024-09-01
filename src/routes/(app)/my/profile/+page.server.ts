import { error, redirect } from '@sveltejs/kit'
import { UserService, PetStoreUserService } from '$lib/services'
import dayjs from 'dayjs'

export async function load({ cookies, locals }) {
	const { store, storeId, me, sid } = locals
	let profile = {}

	try {
		const data = await PetStoreUserService.fetchUser(me.token)

		data.dob = data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null

		profile = data || {
			email: me.email,
			firstName: me.firstName || '',
			lastName: me.lastName || ''
		}
	} catch (e) {
    console.log('/my error: ', e)

		if (e.status === 401) {
			redirect(307, '/auth/login')
		}

		error(e.status, e.message)
	} finally {
	}

	if (profile) {
		return { profile, store: store }
	}

	redirect(307, '/auth/login')
}
