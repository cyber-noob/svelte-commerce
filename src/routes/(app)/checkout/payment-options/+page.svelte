<script lang="ts">
  import { fireGTagEvent } from '$lib/utils/gTagB'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { PaymentLoading } from '$lib/ui'
  import { CheckoutHeader, Error, LazyImg, Pricesummary, TrustBaggeContainer } from '$lib/components'
  import { toast } from '$lib/utils'
  import SEO from '$lib/components/SEO/index.svelte'
  import { PetStoreOrderService } from '$lib/services'
  import Cookie from 'cookie-universal'
  import { OrderTypes } from 'lib/services/petstore/order-service'

  const seoProps = {
	title: 'Select Payment Option',
	metaDescription: 'Choose your payment method'
}

export let data

let cookie = Cookie()

let addressId = $page.url.searchParams.get('address') || ''
let cashfreeReady = false
let comment = ''
let commentMissing = false
let disabled = false
let errorMessage = 'Select a Payment Method'
let loading = false
let loadingForPaymentProcessingSteps = false
let orderNo = $page.url.searchParams.get('order_no') || ''
let paymentDenied = false
let pg = $page.url.searchParams.get('pg') || ''
let razorpayReady = false
let selectedPaymentMethod = { id: '', name: '', text: '', instructions: '', qrcode: '', img: '' }
// let Stripe

// $: if (data.err) {
// 	toast(data.err, 'error')
// }

onMount(async () => {
	// const StripeModule = await import('$lib/components/Stripe.svelte')
	// Stripe = StripeModule.default

	const razorpayScript = document.createElement('script')
	razorpayScript.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js')
	document.head.appendChild(razorpayScript)
	razorpayReady = true

	const cashfreeScript = document.createElement('script')
	cashfreeScript.setAttribute('src', 'https://sdk.cashfree.com/js/v3/cashfree.js')
	document.head.appendChild(cashfreeScript)
	cashfreeReady = true

	fireGTagEvent('begin_checkout', data.cart)

	if (pg) {
		const pm = data?.paymentMethods.filter((pm) => pm.value === pg)
		if (pm[0]) paymentMethodChanged(pm[0])
	} else {
		const pm = data?.paymentMethods && data?.paymentMethods[0]
		paymentMethodChanged(pm)
	}
})

function paymentMethodChanged(pm) {
	selectedPaymentMethod = pm
	errorMessage = null
}

async function submit() {
	if (!data?.cart?.quantity) {
		goto('/my/orders?sort=-updatedAt')
		return
	}

	fireGTagEvent('add_payment_info', data?.cart)

  try {
    console.log('On Razorpay method ....')
    data.err = null
    loading = true
    loadingForPaymentProcessingSteps = true

    const rp = await PetStoreOrderService.createOrder(cookie.get('me').token)
    orderNo = rp?.order_no || rp?.orderNo || rp?.id || ''

    if (orderNo === '')
      toast('Something went wrong', 'error')

    console.log('order no: ', orderNo)
    gotoOrder(orderNo)
    const options = {
      key: "rzp_test_fJLPcc02TCY2NS", // Enter the Key ID generated from the Dashboard
      description: `Order ${orderNo}`,
      amount: rp.amount,
      order_id: rp.id,
      async handler(response) {
        try {
          const capture = await PetStoreOrderService.validatePayment(cookie.get('me').token, {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
          }, OrderTypes.product)

          toast('Payment success', 'success')
          goto(
            `/payment/process?pg=razorpay&order_no=${orderNo}`
          )
            .then(() => console.log('Navigated to payment page successfully ....'))
            .catch((error) => console.error('failed to navigate: ', error))
        } catch (e) {
          data.err = e
        } finally {
        }
      },
      prefill: {
        name: `${data.me.firstName} ${data.me.lastName}`,
        phone: data.me.phone,
        email: data.me?.email || data.cart?.shipping_address?.email || 'help@litekart.in',
        contact: data.me.phone || data.cart?.shipping_address?.phone
      }
    }
    const rzp1 = new Razorpay(options)
    rzp1.open()
  } catch (e) {
    data.err = e
    toast(`Payment failed, please try again`, 'error')
    gotoOrder(orderNo)
  } finally {
    loading = false
  }
}

function gotoOrder(orderNo) {
	const u = new URL($page.url)
	u.searchParams.set('order_no', orderNo)
	goto(u.toString())
}

function checkIfStripeCardValid({ detail }) {
	disabled = !detail
}
</script>

<SEO {...seoProps} />

<div class="container mx-auto min-h-screen w-full max-w-6xl p-3 py-5 sm:p-10">
	<CheckoutHeader selected="payment" />

	<Error err="{data.err}" class="mt-5" />

	<div
		class="mb-14 lg:mb-0 mt-5 md:mt-10 flex flex-col lg:flex-row lg:justify-center gap-10 xl:gap-20">

		<div class="w-full lg:w-96 lg:shrink-0 lg:grow-0">
			<h2 class="mb-5">Cart Summary</h2>

			<hr class="mb-5" />

			{#if data.cart?.shipping_address}
				<div class="mb-5">
					<h5 class="mb-2">Delivery Address</h5>

					<p>
						{data.cart?.shipping_address?.first_name || '_'}
						{data.cart?.shipping_address?.last_name || '_'}

						<br />

						{#if data.cart?.shipping_address?.address}
							{data.cart?.shipping_address?.address}
						{/if}

						{#if data.cart?.shipping_address?.city}
							, {data.cart?.shipping_address?.city}
						{/if}

						{#if data.cart?.shipping_address?.state}
							, {data.cart?.shipping_address?.state}
						{/if}

						{#if data.cart?.shipping_address?.country}
							, {data.cart?.shipping_address?.country}
						{/if}

						{#if data.cart?.shipping_address?.zip}
							- {data.cart?.shipping_address?.zip}
						{/if}
					</p>

					{#if data.cart?.shipping_address?.phone}
						<p>
							{data.cart?.shipping_address?.phone}
						</p>
					{/if}

					{#if data.cart?.shipping_address?.email}
						<p>
							{data.cart?.shipping_address?.email}
						</p>
					{/if}
				</div>

				<hr class="mb-5" />
			{/if}

			{#if data.cart?.billing_address}
				<div class="mb-5">
					<h5 class="mb-2">Billing Address</h5>

					<p>
						{data.cart?.billing_address?.firstName || '_'}
						{data.cart?.billing_address?.lastName || '_'}

						<br />

						{#if data.cart?.billing_address?.address}
							{data.cart?.billing_address?.address}
						{/if}

						{#if data.cart?.billing_address?.city}
							, {data.cart?.billing_address?.city}
						{/if}

						{#if data.cart?.billing_address?.state}
							, {data.cart?.billing_address?.state}
						{/if}

						{#if data.cart?.billing_address?.country}
							, {data.cart?.billing_address?.country}
						{/if}

						{#if data.cart?.billing_address?.zip}
							- {data.cart?.billing_address?.zip}
						{/if}
					</p>

					{#if data.cart?.billing_address?.phone}
						<p>
							{data.cart?.billing_address?.phone}
						</p>
					{/if}

					{#if data.cart?.billing_address?.email}
						<p>
							{data.cart?.billing_address?.email}
						</p>
					{/if}
				</div>

				<hr class="mb-5" />
			{/if}

			{#if data.prescription}
				<div class="mb-5">
					<h5 class="mb-2">Prescription</h5>

					<div class="text-sm font-light">
						{#if data.prescription.name}
							<div class="my-1 flex flex-row">
								<h6 class="mr-2 w-20 shrink-0">Name</h6>

								<p class="flex-1">
									{data.prescription.name}
								</p>
							</div>
						{/if}

						{#if data.prescription.description}
							<div class="my-1 flex flex-row">
								<h6 class="mr-2 w-20 shrink-0">Note</h6>

								<p class="flex-1">
									{data.prescription.description}
								</p>
							</div>
						{/if}

						{#if data.prescription.url}
							<div>
								<LazyImg
									src="{data.prescription.url}"
									alt=""
									height="80"
									class="h-20 w-auto object-contain object-top text-xs" />
							</div>
						{/if}
					</div>
				</div>

				<hr class="mb-5" />
			{/if}

			<Pricesummary
				text="{errorMessage || 'Confirm Order'}"
				{loading}
				on:submit="{() => submit()}" />

			<TrustBaggeContainer class="mt-5" />
		</div>
	</div>
</div>

{#if loadingForPaymentProcessingSteps}
	<PaymentLoading bind:loadingForPaymentProcessingSteps />
{/if}

<iframe name="cashfreeFrame" title="Cashfree" allow="payment"></iframe>
