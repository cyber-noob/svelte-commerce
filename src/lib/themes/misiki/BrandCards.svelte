<script lang="ts">
  import { goto } from '$app/navigation'

  export let brand = {}
</script>

<section class="my-4">
  <button
    class="flex flex-col sm:gap-4 gap-2 justify-center content-center items-center"
    on:click={() => goto(`/search?q=${encodeURIComponent(brand.name)}`)}
  >
      <img
        alt="logo"
        src={brand.link}
        class="object-fill rounded-full overflow-hidden sm:h-24 h-20 sm:w-24 w-20"
      />
    <span class="text-sm font-bold font-mono text-zinc-600 sm:w-44 w-24">
      {brand.name}
    </span>
  </button>
</section>
