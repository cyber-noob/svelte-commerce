import { error, redirect } from '@sveltejs/kit'
import { PetStoreAddressService, AddressService, CartService, CountryService } from '$lib/services'
import { z } from 'zod'

export async function load({ locals, url }) {
	const { me, origin, sid, store, storeId } = locals

	if (!me) {
		redirect(307, `/auth/login?ref=${url.pathname}${url.search}`);
	}

  let address = await PetStoreAddressService.fetchAddresses(me.token)
  let countries = await PetStoreAddressService.fetchCountries(me.token)

  return {
    addresses: {
      count: address.length,
      data: address
    },
    countries: {
      data: countries
    }
  }
}

const zodAddressSchema = z.object({
	address: z.string({ required_error: 'Address is required' }),
	city: z.string({ required_error: 'City is required' }),
	country: z.string({ required_error: 'Country is required' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(3, { message: 'First Name must be at least 3 characters' }),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(3, { message: 'Last Name must be at least 3 characters' }),
	phone: z
		.string({ required_error: 'Phone is required' })
		.min(10, { message: 'Phone must be at least 10 digits' })
		.max(17, { message: 'Phone must be less then 17 digits' }),
	state: z.string({ required_error: 'State is required' }),
	zip: z.string({ required_error: 'ZIP is required' })
})

const zodAddressForINSchema = z.object({
	address: z.string({ required_error: 'Address is required' }),
	city: z.string({ required_error: 'City is required' }),
	country: z.string({ required_error: 'Country is required' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(3, { message: 'First Name must be at least 3 characters' }),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(3, { message: 'Last Name must be at least 3 characters' }),
	phone: z
		.string({ required_error: 'Phone is required' })
		.min(10, { message: 'Phone must be at least 10 digits' })
		.max(17, { message: 'Phone must be less then 17 digits' }),
	state: z.string({ required_error: 'State is required' }),
	zip: z
		.string({ required_error: 'ZIP is required' })
		.min(6, { message: 'ZIP must be at least 6 digits.' })
})

const zodAddressForGBSchema = z.object({
	address: z.string({ required_error: 'Address is required' }),
	city: z.string({ required_error: 'City is required' }),
	country: z.string({ required_error: 'Country is required' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(3, { message: 'First Name must be at least 3 characters' }),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(3, { message: 'Last Name must be at least 3 characters' }),
	phone: z
		.string({ required_error: 'Phone is required' })
		.min(10, { message: 'Phone must be at least 10 digits' })
		.max(17, { message: 'Phone must be less then 17 digits' }),
	state: z.string({ required_error: 'State is required' }),
	zip: z
		.string({ required_error: 'ZIP is required' })
		.min(7, { message: 'ZIP must be at least 7 digits.' })
})

const saveAddress = async ({ request, cookies, locals }) => {
  console.log('in save address ....')
  const {me} = locals
	const data = await request.formData()

  console.log('form data: ', data)

	// for shipping address
	const address = data.get('address')
	const city = data.get('city')
	const country = data.get('country')
	const email = data.get('email')
	const firstName = data.get('firstName')
	const id = data.get('id')
	const lastName = data.get('lastName')
	const phone = data.get('phone')
	const showShippingAddressErrorMessage = data.get('showShippingAddressErrorMessage')
	const state = data.get('state')
	const zip = data.get('zip')
	let selectedShippingAddressCity = data.get('selectedShippingAddressCity')

	// for billing address
	const billingAddressAddress = data.get('billingAddressAddress')
	const billingAddressCity = data.get('billingAddressCity')
	const billingAddressCountry = data.get('billingAddressCountry')
	const billingAddressEmail = data.get('billingAddressEmail')
	const billingAddressFirstName = data.get('billingAddressFirstName')
	const billingAddressLastName = data.get('billingAddressLastName')
	const billingAddressPhone = data.get('billingAddressPhone')
	const billingAddressState = data.get('billingAddressState')
	const billingAddressZip = data.get('billingAddressZip')
	const showBillingAddressErrorMessage = data.get('showBillingAddressErrorMessage')
	let selectedBillingAddressCountry = data.get('selectedBillingAddressCountry')

	let shipping_address = {
		address: address || billingAddressAddress,
		email: email || billingAddressEmail,
		first_name: firstName || billingAddressFirstName,
		last_name: lastName || billingAddressLastName,
		phone: phone || billingAddressPhone,
		pincode: zip || billingAddressZip,
    customer_id: me.id,
    city_id: JSON.parse(selectedShippingAddressCity).id,
    is_default: 0
	}

  console.log('final payload: ', shipping_address)

  let res = {}

  try {
    res = await PetStoreAddressService.addAddress(me.token, shipping_address)
    return res
  } catch (e) {
    error(404, "Unable to Add Address. Please try again later")
  }
}

const editAddress = async ({ request, cookies, locals }) => {
	const data = await request.formData()
  const {me} = locals

	const address = data.get('address')
	const city = data.get('city')
	const country = data.get('country')
	const email = data.get('email')
	const firstName = data.get('firstName')
	const id = data.get('id')
	const lastName = data.get('lastName')
	const showShippingAddressErrorMessage = data.get('showShippingAddressErrorMessage')
	const state = data.get('state')
	const zip = data.get('zip')
	let phone = data.get('phone')
	let selectedShippingAddressCountry = data.get('selectedShippingAddressCountry')

  let selectedShippingAddressCity = data.get('selectedShippingAddressCity')

  // for billing address
  const billingAddressAddress = data.get('billingAddressAddress')
  const billingAddressCity = data.get('billingAddressCity')
  const billingAddressCountry = data.get('billingAddressCountry')
  const billingAddressEmail = data.get('billingAddressEmail')
  const billingAddressFirstName = data.get('billingAddressFirstName')
  const billingAddressLastName = data.get('billingAddressLastName')
  const billingAddressPhone = data.get('billingAddressPhone')
  const billingAddressState = data.get('billingAddressState')
  const billingAddressZip = data.get('billingAddressZip')
  const showBillingAddressErrorMessage = data.get('showBillingAddressErrorMessage')
  let selectedBillingAddressCountry = data.get('selectedBillingAddressCountry')

  let shipping_address = {
    address: address || billingAddressAddress,
    email: email || billingAddressEmail,
    first_name: firstName || billingAddressFirstName,
    last_name: lastName || billingAddressLastName,
    phone: phone || billingAddressPhone,
    pincode: zip || billingAddressZip,
    customer_id: me.id,
    city_id: JSON.parse(selectedShippingAddressCity).id,
    is_default: 0
  }

  console.log('final payload: ', shipping_address)

  let res = {}

  try {
    res = await PetStoreAddressService.editAddress(me.token, id, shipping_address)
    return res
  } catch (e) {
    error(404, "Unable to Add Address. Please try again later")
  }
}

const deleteAddress = async ({ request, cookies, locals }) => {
	// if (confirm('Are you sure to delete?')) {
  const {me} = locals
	const data = await request.formData()
	const id = data.get('id')
	try {
		const res = await PetStoreAddressService.deleteAddresses(me.token, id)

		return res
	} catch (e) {
		console.log('e', e)
		return null
	}
}

export const actions = { saveAddress, editAddress, deleteAddress }
