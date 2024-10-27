<script lang="ts">
  import OwnPuppyIcon from '$lib/icons/own_puppy.svg'
  import PuppyAccessory from '$lib/icons/puppy_accessories.svg'
  import PuppyHealth from '$lib/icons/puppy_health.svg'

  export let brand = {}

</script>

<section>
  <div class="flex w-3/4 gap-4 my-4">
    <img
      alt="logo"
      src={brand?.image}
      class="aspect-square w-96 h-80"
    >

    <div class="flex flex-col ml-4">
      <div>
        <div class="sm:text-lg text-zinc-900 font-bold border-l-4 border-green-400 p-4">
          {brand?.title}
        </div>
        <div class="prose max-w-none text-sm text-zinc-500 mt-4">
          {brand?.short_summary}
        </div>
      </div>

      <div class="mt-4">
        <div class="flex m-4">
          <img
            alt="logo"
            src={OwnPuppyIcon}
            class="w-8 h-8"
          />
          <p class="text-sm text-green-400 m-2 underline underline-offset-8">Click here to get your own puppy ...</p>
        </div>
        <div class="flex m-4">
          <img
            alt="logo"
            src={PuppyAccessory}
            class="w-8 h-8"
          />
          <p class="text-sm text-green-400 m-2 underline underline-offset-8">Click here to get your special accessories for ...</p>
        </div>
        <div class="flex m-4">
          <img
            alt="logo"
            src={PuppyHealth}
            class="w-8 h-8"
          />
          <p class="text-sm text-green-400 m-2 underline underline-offset-8">Click here to get your pet checked ...</p>
        </div>
      </div>
    </div>
  </div>
</section>
