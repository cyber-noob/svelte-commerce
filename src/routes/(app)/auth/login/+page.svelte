<script>
// import indiaFlag from '$lib/assets/flags/india.png'
import { applyAction, enhance } from '$app/forms'
import { browser } from '$app/environment'
import { fly, scale } from 'svelte/transition'
import { GOOGLE_CLIENT_ID } from '$lib/config'
import { googleOneTap } from './google-one-tap'
import { goto, invalidateAll } from '$app/navigation'
import { LazyImg, Error } from '$lib/components'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { PrimaryButton } from '$lib/ui'
import { toast } from '$lib/utils'
import Cookie from 'cookie-universal'
import SEO from '$lib/components/SEO/index.svelte'
import VerifyOtp from '../_VerifyOtp.svelte'
import { UserService, PetStoreUserService } from '$lib/services'
import logo from '$lib/icons/logo-crop.png'

const cookies = Cookie()

const IS_DEV = import.meta.env.DEV

export let data

const seoProps = {
	title: 'Login with email/phone',
	description: 'Login with email/phone'
}

let email = $page?.url?.searchParams.get('email')
let err
let isEmail = false
let isMobile = false
let loading = false
let maxlength = null
let otpRequestSend = false
let password = IS_DEV ? 'litekart' : ''
let phone = IS_DEV ? '8249028220' : ''
let ref = $page?.url?.searchParams.get('ref')
let resendAfter = 0
let selectedCountry = data.countries[0]
let showDropDown = false
let showPassword = false
let type = 'password'
let value = email ? email : IS_DEV ? 'hi@litekart.in' : null
let zodErrors = null

onMount(() => {
	googleOneTap(
		{
			client_id: GOOGLE_CLIENT_ID
		},
		async (res) => {
			try {
        const me = await PetStoreUserService.addUser(res['credential'])
				await cookies.set('me', me, { path: '/', maxAge: 31536000 })
				let r = ref || '/'
				if (browser) goto(r)
			} catch (e) {
				toast(e?.body?.message || e, 'error')
			}
		}
	)

	verifyIsMobileNum()
})

function togglePassword() {
	showPassword = !showPassword
	if (type === 'password') {
		type = 'text'
	} else type = 'password'
}

const verifyIsMobileNum = () => {
	err = null

	if (value) {
		if (value[0] === '+') {
			isEmail = false
			isMobile = true
			maxlength = 13
		} else if (parseFloat(value) == value) {
			isEmail = false
			isMobile = true
			maxlength = 13
		} else {
			isEmail = true
			isMobile = false
			maxlength = null
		}
	} else {
		isEmail = false
		isMobile = false
		maxlength = null
	}

	if (isMobile) {
		phone = value
	}
}

async function handleSendOTP({ detail }) {
	phone = detail
	resendAfter = 0

	try {
		loading = true

		const res = await UserService.getOtpService({
			phone,
			storeId: data.storeId,
			origin: data.origin
		})

		resendAfter = res?.timer
		otpRequestSend = true
	} catch (e) {
		toast(e?.body?.message || e, 'error')
	} finally {
		loading = false
	}
}

function changeNumber() {
	value = ''
	otpRequestSend = false
}
</script>

<SEO {...seoProps} />

<div class="flex justify-center content-center items-center w-full max-w-md flex-col rounded-2xl border bg-white p-10 shadow-2xl">
	<a href="/" aria-label="Go to home" class="mx-auto mb-8 block max-w-max">
			<img
				src="{logo}"
				alt="logo"
				class="max-h-16 sm:max-h-24 w-40 object-contain object-center" />
	</a>

	<h2 class="mb-8 w-full text-center text-2xl font-semibold text-primary-500">Log in</h2>

	<Error {err} class="mb-5" />

  <div id="googleSignIn"></div>

	<!-- Signup & Join as Vendor -->

	<div class="mx-auto mb-5 flex max-w-max flex-col gap-1 text-center text-sm">

		<!-- <a
			href="{$page.data.store?.adminUrl}?role=vendor&store={$page.data.store}"
			aria-label="Click to login as vendor"
			class="whitespace-nowrap text-primary-500 hover:text-primary-700 hover:underline">
			Join as Vendor
		</a> -->
	</div>

	<!-- Terms & Conditions -->

	<p in:fly="{{ y: 10, duration: 700, delay: 300 }}" class="text-center text-sm text-zinc-500">
		By clicking login you are accepting our

		<br />

		<a
			href="/terms-conditions"
			aria-label="Click to visit terms & conditions"
			target="_blank"
			rel="noopener noreferrer"
			class="whitespace-nowrap text-primary-500 hover:text-primary-700 hover:underline">
			<b>Terms & Conditions</b>
		</a>
	</p>
</div>
