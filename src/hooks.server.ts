// import * as SentryNode from '@sentry/node'
import { authenticateUser } from '$lib/server'
import { dev } from '$app/environment'
import { DOMAIN, IS_DEV, listOfPagesWithoutBackButton } from '$lib/config'
import { error, type Handle, type HandleServerError, redirect } from '@sveltejs/kit'
import { InitService } from '$lib/services'
import { nanoid } from 'nanoid'
import { err } from 'lib/components/Error.svelte'

// const SENTRY_DSN = env.SECRET_SENTRY_DSN

// if (SENTRY_DSN && SENTRY_DSN !== 'YOUR_SENTRY_DSN') {
// 	SentryNode.init({
// 		dsn: SENTRY_DSN
// 	})
// }

/** @type {import('@sveltejs/kit').HandleFetch} */
export const handleFetch = async ({ event, request, fetch }) => {
	// console.log('request spec: ', request)
  request.headers.set('cookie', event.request.headers.get('cookie'), { path: '/' })

	return fetch(request)
}

export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = nanoid()
	// SentryNode.captureException(error, {
	// 	contexts: { sveltekit: { event, errorId } }
	// })

  console.log('hook error: ', error)
	return {
		message: "An unexpected error occurred. We're working on it.",
		errorId
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const url = new URL(event.request.url)
		const host = url.host
		const protocol = !IS_DEV && !dev ? `https://` : `http://`
		// This is required for vercel as it parse URL as http instead of https
		event.locals.origin = protocol + host

    console.log('host: ', host)
		event.locals.host = url.host

		const userAgent = event.request.headers.get('user-agent')

		const isDesktop = !/mobile/i.test(userAgent)
		const isShowBackButton = !listOfPagesWithoutBackButton.includes(url?.pathname)

		event.locals.isDesktop = isDesktop
		event.locals.isShowBackButton = isShowBackButton

		// This calls init only when store data not present in browser cookies
		// const { storeOne } = await fetchStoreData(event)
		// console.timeEnd('init1')

		// event.locals.menu = menu || []
		// event.locals.megamenu = megamenu || []

		// this simply gets data from cookie
		event.locals.me = await authenticateUser(event)
		const zip = event.cookies.get('zip')
		event.locals.sid = event.cookies.get('connect.sid')
		event.locals.cartId = event.cookies.get('cartId')

    let me = event.cookies.get('me')
    if (me)
      event.locals.me = JSON.parse(me)

		if (zip) event.locals.zip = JSON.parse(zip)
		// This makes a call to backend on every request

		// await fetchCart(event)

		// const derivedSid: string = event.cookies.get('connect.sid') || ''
		//Cart(event)

		// const derivedSid: string = event.cookies.get('connect.sid') || ''
		// const route = event.url
		// const start = performance.now()
		// event.locals.sid = derivedSid
		// event.request.headers.delete('connection')
		const response = await resolve(event)
    console.log('hook: ', response)
    if (response.status === 401){
      console.log('hook 401')
      throw redirect(303, `/auth/login?ref=${url?.pathname}`)
    }

		// const end = performance.now()
		// const responseTime = end - start

		// if (responseTime > 1000) {
		// 	// console.log(`🐢 ${route} took ${responseTime.toFixed(2)} ms`)
		// }

		// if (responseTime < 100) {
		// 	// console.log(`🚀 ${route} took ${responseTime.toFixed(2)} ms`)
		// }

		return response
	} catch (e) {
		// If the store is not found, throw a 404 error
    console.error('hook err: ', e)
		// error(404, 'Store Not Found')
	}
}
