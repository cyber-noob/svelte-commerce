<script lang="ts">

  import BrandCards from 'lib/themes/misiki/BrandCards.svelte'
  import TrendingPets from '$lib/assets/dressup.png'
  import GoldenRetriever from '$lib/assets/golden-retriever.jpg'
  import SEO from 'lib/components/SEO/index.svelte'
  import { PetStoreSearchService } from '$lib/services'
  import { onMount } from 'svelte'

  const seoProps = {
    title: 'Trending Pets',
    description: 'Explore trending pets in your area'
  }

  let items:{} = {}

  onMount(async () => {
    items = await PetStoreSearchService.fetchAllPetBreeds()
  })
</script>

<SEO {...seoProps} />

<section class="w-screen p-12">
  <div class="flex flex-col gap-8 w-full">
    <a href="/new-trending">
      <div class="flex content-center items-center bg-zinc-950 border-b-2 shadow-xl rounded-xl">
        <img
          alt="logo"
          src={TrendingPets}
          class="object-fill sm:h-72 h-44"
        />
        <div class="flex w-full justify-center items-center content-center">
          <p class="sm:text-5xl text-xl font-extrabold text-green-500">TRENDING PETS ON STORE</p>
        </div>
      </div>
    </a>
  </div>

  {#each Object.keys(items) as key}
    <div class="flex flex-col w-[100%] p-4 mt-8 rounded-xl shadow-2xl bg-white">
      <div class="flex flex-row gap-4">
        <img
          alt="logo"
          src={items[key][0].link}
          class="object-fill rounded-full border-4 border-zinc-200 overflow-hidden sm:h-16 h-20 sm:w-16 w-20"
        />
        <div class="flex flex-col justify-center text-center prose text-xl font-extrabold capitalize tracking-wider gap-4">
          <span>{key}</span>
        </div>
      </div>
      <div class="flex w-full items-center content-end sm:gap-12 gap-4 sm:m-4 overflow-auto">
        {#each items[key] as item}
          <BrandCards brand={item} />
        {/each}
      </div>
    </div>
    {/each}
</section>
