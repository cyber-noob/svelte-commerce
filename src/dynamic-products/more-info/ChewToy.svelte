<script lang="ts">
  export let product
</script>

<template>
  <table class="table-auto border-separate border-spacing-y-4 border-y border-gray-300 text-sm font-bold font-sans">
    <tbody>
    {#each product.key_features as feature}
      <tr class="border-gray-300 border-y border-spacing-y-4 p-8">
        <td class="p-1 text-xs font-semibold uppercase tracking-wide">
          {feature}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
  <br />
  <table class="border-separate border-spacing-y-4 border-y border-gray-300 font-bold text-sm font-sans">
    <caption class="caption-top text-base font-semibold uppercase tracking-wide">
      Manufacturer Details
    </caption>
    <tbody>
    {#each Object.keys(product.manufacturer) as key }
      <tr class="border-separate border-spacing-4 p-20">
        <td class="p-4 text-xs font-semibold uppercase tracking-wide">
          {key}
        </td>
        <td class="p-4 text-xs font-semibold uppercase tracking-wide">
          {product.manufacturer[key]}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
</template>
