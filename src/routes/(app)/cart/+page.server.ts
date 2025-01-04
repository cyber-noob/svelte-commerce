import { error, fail, redirect } from '@sveltejs/kit'
import { CartService, WishlistService } from '$lib/services'
import type { Action, Actions, PageServerLoad } from './$types'
import { PetStoreCartService } from '$lib/services'
import Cookie from 'cookie-universal'

let cookie = Cookie()

export const load: PageServerLoad = async ({ url, request, locals, cookies, depends }) => {
	const { store, storeId, origin } = locals
	depends('cart:my')
	let loading = false
	let cart = locals.cart

	try {
		loading = true

    const res = await PetStoreCartService.fetchCart(JSON.parse(cookies.get('me')).token)

    if (res) {
      cart = {
        cart_id: res?.cart_id,
        currencySymbol: res?.currencySymbol,
        discount: res?.discount,
        formattedAmount: res?.formattedAmount,
        items: res?.items,
        quantity: res?.quantity,
        savings: res?.savings,
        selfTakeout: res?.selfTakeout,
        shipping: res?.shipping,
        subtotal: res?.pricing?.subtotal,
        tax: res?.pricing?.tax,
        total: res?.pricing?.total,
        unavailableItems: res?.unavailableItems
      }

      locals.cartId = res?.cart_id
      cookies.set('cartId', locals.cartId, { path: '/', maxAge: 31536000 })
      console.log('cart: ', cart)
    }
	}
  catch (e) {
    if (e?.status === 401) {
      throw redirect(307, `/auth/login?ref=${url?.pathname}`)
    }
    error(400, e?.body?.message || e)
  }
  finally {
		loading = false
	}
	return { loadingCart: loading, cart }
}

const add: Action = async ({ url, request, cookies, locals }) => {
  const data = Object.fromEntries(await request.formData())
  const pid = data.pid
  const line_id = data.line_id
  const variantsLength = +data.variantsLength
  const currentVariantId = data.currentVariantId
  let qty = +data.qty
  const linkedItems = JSON.parse(data.linkedItems || '[]')
  const options = JSON.parse(data.options || '[]') //data.options //
  const customizedImg = data.customizedImg
  const customizedData = data.customizedData
  let cartId = locals.cartId

  if (variantsLength > 0 && !currentVariantId) {
    return 'choose variant'
  }

  console.log('+page.server qty: ', qty)
  let option: string = null;

  if (qty >= 0)
    option = 'plus'
  if (qty < 0) {
    console.log('minus qty: ', qty)
    option = 'minus'
    qty = -qty
  }

  console.log('pid: ', pid)
  if (typeof pid !== 'string' || !pid) {
    return fail(400, { invalid: true })
  }
  try {
    let cart = await PetStoreCartService.addToCart(JSON.parse(cookies.get('me')).token, option, {
      product_id: pid,
      quantity: qty || 1
    })
    console.log('cart response: ', cart)
    // if (!cartId) { // Commented out because when can't find cart_id in database, it will still won't set the new cart_id in cookies
    cartId = cart.cart_id // This is required because when cart_id is null, it will add 3 items with null cart id hence last one prevails
    cookies.set('cartId', cartId, { path: '/', maxAge: 31536000 })
    // }

    if (linkedItems?.length) {
      for (const i of linkedItems) {
        cart = await PetStoreCartService.addToCart(JSON.parse(cookies.get('me')).token, option, {
          product_id: pid,
          quantity: 1
        })
      }
    }

    if (cart) {
      const cartObj = {
        cartId: cart?.cart_id,
        currencySymbol: cart?.currencySymbol,
        discount: cart?.discount,
        formattedAmount: cart?.formattedAmount,
        items: cart?.items,
        quantity: cart?.quantity,
        savings: cart?.savings,
        selfTakeout: cart?.selfTakeout,
        shipping: cart?.shipping,
        subtotal: cart?.pricing?.subtotal,
        tax: cart?.pricing?.tax,
        total: cart?.pricing?.total,
        unavailableItems: cart?.unavailableItems
      }

      console.log('cartObj: ', cartObj)
      locals.cart = cartObj
      locals.cartId = cartObj.cartId
      locals.cartQty = cartObj.qty

      if (!cartId) cookies.set('cartId', cartObj.cartId, { path: '/', maxAge: 31536000 })

      return cartObj
    } else {
      return {}
    }
  } catch (e) {
    throw redirect(307, `/auth/login?ref=${url?.pathname}`)
  }
}

const createBackOrder: Action = async ({ request, cookies, locals }) => {
	const data = await request.formData()
	const pid = data.get('pid')
	const qty = +data.get('qty')
	let sid = cookies.get('connect.sid')

	if (typeof pid !== 'string' || !pid) {
		return fail(400, { invalid: true })
	}

	try {
		const cart = await CartService.createBackOrder({
			pid,
			qty,
			storeId: locals.storeId,
			origin: locals.origin,
			sid // This is a special case to pass complete cookie
		})

		if (!sid) {
			sid = cart.sid
			cookies.set('connect.sid', sid, { path: '/' })
		}
	} catch (e) {
		return {}
	}
}

const handleUnavailableItems: Action = async ({ request, cookies, locals }) => {
	const data = await request.formData()
	const sid = cookies.get('connect.sid')

	try {
		const movedRes = await WishlistService.moveUnavailableItemsToWishlist({
			storeId: locals.storeId,
			origin: locals.origin,
			sid // This is a special case to pass complete cookie
		})
	} catch (e) {
		return {}
	}

	return {}
}

export const actions: Actions = { add, createBackOrder, handleUnavailableItems }
