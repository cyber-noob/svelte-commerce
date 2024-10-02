<script>
  export let d = {}
</script>

<div class="flex flex-col sm:w-32 w-12 justify-center content-center items-center">
  <div class="flex flex-row sm:h-16 h-20 w-full bg-gray-100 justify-center content-center items-center">
    {d.day}
  </div>

  {#if (d.isEnabled)}
    <button class="flex flex-col h-full w-full font-bold justify-center content-center items-center text-red-500 focus:z-10 focus:bg-red-500 focus:text-white">
      <div class="text-2xl">
        {d.date}
      </div>
      <div class="text-xs">
        {d.month}
      </div>
    </button>
  {:else}
    <div class="flex flex-col h-full justify-center content-center items-center text-gray-300 font-bold disabled:">
      <div class="text-2xl">
        {d.date}
      </div>
      <div class="text-xs">
        {d.month}
      </div>
    </div>
  {/if}
</div>
