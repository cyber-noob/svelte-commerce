<style>
.track {
	border-radius: 25px;
	font-size: 11px;
}
</style>

<script>
// import { storeStore } from '$lib/store/store'
import { browser } from '$app/environment'
import { currency, date } from '$lib/utils'
import { goto } from '$app/navigation'
import { LazyImg, Pagination } from '$lib/components'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { PrimaryButton, WhiteButton } from '$lib/ui'
import noAddToCartAnimate from '$lib/assets/no/add-to-cart-animate.svg'
import OrderListSkeleton from './_OrderListSkeleton.svelte'
import productNonVeg from '$lib/assets/product/non-veg.png'
import productVeg from '$lib/assets/product/veg.png'
import CartProductComponent from '../../../../dynamic-products/cart/CartProductComponent.svelte'
import CartVCComponent from '../../../../dynamic-products/cart/CartVCComponent.svelte'

export let orders

let clazz = ''
export { clazz as class }

// let store = {}
$: store = $page.data.store

// onMount(() => {
// 	if (browser) {
// 		storeStore.subscribe((value) => (store = value))
// 	}
// })
</script>

<div class="w-full {clazz}">
	{#if orders.count}
		<div>
			<header class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<h1>
					Orders {#if orders.count}({orders.count}){/if}
				</h1>

				<!--  Back button -->

				<div class="flex flex-wrap items-center gap-2">
					<a href="/my" class="block">
						<WhiteButton hideLoading class="group text-xs">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-5 w-5 transform transition duration-300 group-hover:-translate-x-2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"
								></path>
							</svg>

							<div class="flex flex-col gap-0.5 text-left">
								<span class="hidden text-xs font-normal text-zinc-500 sm:block"> Prev </span>

								<span>Dashboard</span>
							</div>
						</WhiteButton>
					</a>
				</div>
			</header>

			<ul>
				{#each orders.orders as order}
          {#if order?.order_type === 'products'}
            <CartProductComponent order={order} />
            {:else if order?.order_type === 'videoCall'}
            <CartVCComponent order={order} />
          {/if}
				{/each}
			</ul>

			<Pagination
				count="{Math.ceil((orders?.count || 1) / orders?.pageSize)}"
				current="{orders?.currentPage || 1}" />
		</div>
	{:else}
		<div class="flex h-[70vh] flex-col items-center justify-center text-center">
			<img src="{noAddToCartAnimate}" alt="empty wishlist" class="mb-5 h-60 object-contain" />

			<h2 class="mb-2">You have't Ordered Yet!!</h2>

			<p class="mb-5">There's no order placed, start adding items to your cart.</p>

			<a href="/" aria-label="Click to visit home" data-sveltekit-preload-data>
				<PrimaryButton class="w-40 py-2 text-sm">Shop Now</PrimaryButton>
			</a>
		</div>
	{/if}
</div>
