<script lang="ts">
  let sellerStats = [
    {
      title: 'Products Catalogue',
      count: 5
    },
    {
      title: 'Total Items Count',
      count: 30
    },
    {
      title: 'Sales',
      count: 15
    },
    {
      title: 'Video Counselling',
      count: 80
    },
    {
      title: 'Conversion Rate',
      count: (15 / 80) * 100 + '%'
    }
  ]
</script>

<template>
  <div class="flex flex-col gap-8 w-full p-8 content-center justify-center">
    <div class="flex flex-row gap-4 w-full p-4">
      <div class="text-xl font-extrabold leading-tight tracking-wider">DASHBOARD</div>
      <button class="rounded-lg bg-white border-2 text-center w-36 font-semibold p-2">
        + Add Product
      </button>
    </div>

    <div class="flex flex-row w-full p-4 content-center justify-center">
      <div class="flex flex-row gap-4 w-3/4 p-8 border-2">
        {#each sellerStats as stats}
          <div id="card" class="flex flex-col border-2 border-zinc-400 bg-white rounded-lg items-center justify-center content-center w-56 h-56 gap-8">
            <div class="font-extrabold">{stats.title}</div>
            <div class="text-5xl text-zinc-700">{stats.count}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</template>
