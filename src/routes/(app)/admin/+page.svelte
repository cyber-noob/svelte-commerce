<script lang="ts">
  import dashboardWishlist from 'lib/assets/dashboard/wishlist.png'
  import dashboardMyOrders from 'lib/assets/dashboard/my-orders.png'

  const menu = [
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  			  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			  </svg>`,
      name: 'Analytics',
      hidden: 'hidden',
      url: '/admin/dashboard',
      pathName: '/admin/product/update',
      role: 'admin',
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  			  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			  </svg>`,
      name: 'Add Product',
      hidden: 'hidden',
      url: '/admin/product/add',
      pathName: '/admin/product/update',
      role: 'admin'
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
			  </svg>`,
      name: 'Update Product',
      hidden: 'hidden',
      url: '/admin/product/update',
      pathName: '/admin/product/update',
      role: 'admin'
    }
  ]
</script>

<template>
  <div
    class="mt-2 space-y-4 lg:mt-5 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:space-y-0">
    {#each menu as m}
      <a
        href="{m.url}"
        aria-label="Click to visit my wishlist"
        class="relative flex items-end justify-between overflow-hidden rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 p-4 text-white shadow-lg shadow-fuchsia-500/30 sm:p-6 lg:w-1/2">
        <div class="flex-1" in:fly="{{ y: 20, duration: 1000, delay: 700 }}">
          <h2 class="mt-2">{m.name}</h2>
        </div>

        <div class="absolute right-0 bottom-0 -m-5 overflow-hidden lg:-m-7">
          <img width="100px" height="100px" src="{m.svg}"/>
        </div>
      </a>
    {/each}
  </div>
</template>
