<script>
  export let d = {}

  let clicked = false

  function handleClick() {
    clicked = !clicked
  }
</script>

<div class="flex flex-col w-32 justify-center content-center items-center">
  <div class="flex flex-row h-16 w-full bg-gray-100 justify-center content-center items-center">
    {d.day}
  </div>

  {#if (d.isEnabled)}
    <button
      class="flex flex-col h-full w-full justify-center content-center items-center font-bold
      {clicked ? 'text-white bg-purple-600' : 'text-purple-600'}"
      on:click={()=> {handleClick()}}
    >
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
