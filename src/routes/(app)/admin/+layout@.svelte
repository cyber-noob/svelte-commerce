<style>
  .minimum-width-rem {
    min-width: 360px;
  }
</style>

<script lang="ts">
  import { MobileFooter, PageTransitions } from '$lib/components'
  import { Nav } from '$lib/theme-config'
  import { page } from '$app/stores'
  import SidebarDashboard from './_AdminSidebar.svelte'

  export let data

  $: innerHeight = 0
  $: innerWidth = 0

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

  let hellobar = $page.data.store?.hellobar || {}
  let openSidebar = false
  let showCartSidebar = false
  let slotHeightAccToPageHeight = innerHeight

  $: if (innerWidth < 640) {
    if (hellobar?.active?.val && $page.data.store?.isHyperlocal) {
      // 112 (without mobile footer)
      // 168 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 168
    } else if (hellobar?.active?.val && !$page.data.store?.isHyperlocal) {
      // 88 (without mobile footer)
      // 144 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 144
    } else if ($page.data.store?.isHyperlocal && !hellobar?.active?.val) {
      // 80 (without mobile footer)
      // 136 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 136
    } else if (!hellobar?.active?.val && !$page.data.store?.isHyperlocal) {
      // 56 (without mobile footer)
      // 112 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 112
    }
  } else if (innerWidth < 1024) {
    if (hellobar?.active?.val && $page.data.store?.isHyperlocal) {
      // 136 (without mobile footer)
      // 192 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 192
    } else if (hellobar?.active?.val && !$page.data.store?.isHyperlocal) {
      // 112 (without mobile footer)
      // 168 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 168
    } else if ($page.data.store?.isHyperlocal && !hellobar?.active?.val) {
      // 104 (without mobile footer)
      // 160 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 160
    } else if (!hellobar?.active?.val && !$page.data.store?.isHyperlocal) {
      // 80 (without mobile footer)
      // 136 (with mobile footer)
      slotHeightAccToPageHeight = innerHeight - 136
    }
  } else {
    if (hellobar?.active?.val && $page.data.store?.isHyperlocal) {
      slotHeightAccToPageHeight = innerHeight - 112
    } else if (hellobar?.active?.val && !$page.data.store?.isHyperlocal) {
      slotHeightAccToPageHeight = innerHeight - 112
    } else if ($page.data.store?.isHyperlocal && !hellobar?.active?.val) {
      slotHeightAccToPageHeight = innerHeight - 80
    } else if (!hellobar?.active?.val && !$page.data.store?.isHyperlocal) {
      slotHeightAccToPageHeight = innerHeight - 80
    }
  }
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<main class="minimum-width-rem">
  <Nav me="{data.me}" store="{data.store}" bind:showCartSidebar bind:openSidebar data="{data}"/>

  <div class="flex w-full antialiased" style="height: {slotHeightAccToPageHeight}px;">
    {#if menu?.length > 0}
      <div
        class="relative hidden w-44 shrink-0 overflow-y-auto overflow-x-hidden bg-primary-500 py-3 scrollbar-none lg:block">
        <!-- Dashboard -->

        <a href="/my" aria-label="Click to visit dashboard" data-sveltekit-preload-data>
          <button
            type="button"
            class="w-full p-3 text-left text-sm text-zinc-200 focus:outline-none">
            Dashboard
          </button>
        </a>

        <!-- Sidebar Data -->

        {#each menu as s}
          <SidebarDashboard me="{data.me}" sidebar="{s}" />
        {/each}
      </div>
    {/if}

    <div class="h-full w-full flex-1 overflow-y-auto p-3 py-5 sm:p-10">
      <PageTransitions url="{data.url}">
        <!-- {#key data.url} -->
        <slot />
        <!-- {/key} -->
      </PageTransitions>
    </div>
  </div>

  <!-- MOBILE FOOTER -->

  <div class="block lg:hidden">
    <MobileFooter />
  </div>
</main>
