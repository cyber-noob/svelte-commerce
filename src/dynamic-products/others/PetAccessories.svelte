<script lang="ts">
  import {slide} from 'svelte/transition'

  export let product:{}

  let showKeyFeatures = false
  let showManufacturerDetails = false
</script>

<template>
  <div class="flex flex-col border-t border-b">
    <button
      type="button"
      class="py-5 w-full flex items-center gap-2 justify-between focus:outline-none"
      on:click="{() => (showKeyFeatures = !showKeyFeatures)}">
      <h5 class="uppercase">Key Features</h5>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5 transition duration-300
									{showKeyFeatures ? 'transform -rotate-45' : ''}">
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
        ></path>
      </svg>
    </button>

    {#if showKeyFeatures}
      <div transition:slide="{{ duration: 300 }}" class="pb-5 prose max-w-none">
      {#each product.key_features as feature}
        <div class="prose max-w-none text-sm text-zinc-500 tracking-wide">{feature}</div>
        <br />
      {/each}
      </div>
    {/if}
  </div>
  {#if 'manufacturer' in product}
    <div class="flex flex-col border-t border-b">
      <button
        type="button"
        class="py-5 w-full flex items-center gap-2 justify-between focus:outline-none"
        on:click="{() => (showManufacturerDetails = !showManufacturerDetails)}">
        <h5 class="uppercase">Manufacturer Details</h5>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 transition duration-300
									{showManufacturerDetails ? 'transform -rotate-45' : ''}">
          <path
            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
          ></path>
        </svg>
      </button>

      {#if showManufacturerDetails}
        <div transition:slide="{{ duration: 300 }}" class="pb-5 prose max-w-none">
          {#each Object.keys(product.manufacturer) as key}
            <div class="flex flex-row gap-4">
              <div class="flex items-center gap-4">{key}</div>
              <div class="prose max-w-none text-sm text-zinc-500 tracking-wide">{product.manufacturer[key]}</div>
            </div>
            <br />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</template>
