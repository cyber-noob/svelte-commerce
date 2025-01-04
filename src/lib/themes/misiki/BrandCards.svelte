<script lang="ts">
  import { goto } from '$app/navigation'

  export let brand = {}

  function createGradient(color: string) {
    return `${color.from} ${color.via} ${color.to} bg-gradient-to-r`
  }
</script>

<section class="my-4">
  <button
    class="flex flex-col sm:gap-4 gap-2
    justify-center content-center items-center"
    on:click={() => goto(`/search?q=${encodeURIComponent(brand.q)}`)}
  >
      <img
        alt="logo"
        src={brand.image}
        class="object-fill rounded-full border-4 border-zinc-200 overflow-hidden sm:h-36 h-20 sm:w-36 w-20"
      />
    <span class="font-bold font-mono text-zinc-950 sm:w-44 w-24">
      {brand.title}
    </span>
  </button>
</section>
