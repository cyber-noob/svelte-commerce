<script lang="ts">
  import OwnPuppyIcon from '$lib/icons/own_puppy.svg'
  import PuppyAccessory from '$lib/icons/puppy_accessories.svg'
  import PuppyHealth from '$lib/icons/puppy_health.svg'
  import GoldenRetriever from '$lib/assets/goldPup-removebg-preview.png'
  import { goto } from '$app/navigation'

  export let brand = {}

  function createGradient(color: string) {
    return `${color.from} ${color.via} ${color.to} bg-gradient-to-r`
  }
</script>

<section class="my-4">
  <div class={`flex w-full gap-4 h-64 justify-evenly rounded-2xl ${createGradient(brand.bg_color)}`}>
    <img
      alt="logo"
      src={brand.image}
      class="object-contain h-64 w-2/4"
    />
    <div class="flex flex-col w-full mr-8">
      <span class="sm:text-3xl my-4 text-white font-extrabold border-l-4 border-white pl-4">
        {brand.title}
      </span>
      <div class="my-4 prose max-w-none text-base font-bold text-zinc-800">
        <span>
          {brand.short_summary}
        </span>
      </div>
      <div class="flex flex-row justify-start">
        <button class="m-4 p-2 bg-black text-sm text-white font-extrabold">
          <span>
            Explore Blogs
          </span>
        </button>
        <button
          on:click={() => goto(`/search?q=${encodeURIComponent(brand.q)}`)}
          class="bg-black m-4 p-2 prose max-w-none text-sm text-white font-extrabold"
        >
         <span>
           Explore Pets Collection
         </span>
        </button>
        <div class="bg-black m-4 p-2 prose max-w-none text-sm text-white font-extrabold">
          Explore Accessories
        </div>
      </div>
    </div>
  </div>
</section>
