<script lang="ts">
  import Leads from './_Leads.svelte'
  import Earnings from './_Earnings.svelte'
  import CPC from './_CPC.svelte'

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
  <div class="flex flex-col gap-8">
    <div class="text-xl font-extrabold leading-tight tracking-wider">DASHBOARD</div>
    <div class="flex flex-row w-full gap-4">
      <CPC />
      <Leads />
      <Earnings />
    </div>
    <div class="flex flex-row gap-2">
      <div class="flex flex-col text-center text-base justify-center">Range</div>
      <select>
        <option value="month">This Month</option>
      </select>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-row w-full gap-4 flex-wrap">
        {#each sellerStats as stats}
          <div id="card" class="flex flex-col border-2 shadow-xl bg-white rounded-lg items-center justify-center content-center w-56 h-56 gap-8">
            <div class="font-extrabold">{stats.title}</div>
            <div class="text-5xl text-zinc-700">{stats.count}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</template>
