<script lang="ts">
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';

  export let colors:[]
  export let payload:{}

  let open = false
  let selectedColor:{} = ''
</script>

<template>
  <Button>{selectedColor !== '' ? selectedColor.name : '-- Select Color --'}<ChevronDownOutline class="w-6 h-6 ms-2" /></Button>
  <Dropdown class="overflow-y-auto py-2 h-56" bind:open={open}>
    {#each colors as c}
      <DropdownItem on:click={(e) => {
        console.log('clicked: ', c)
        open = !open;
        selectedColor = c
        payload.color = selectedColor.name
        console.log(selectedColor)
      }}>
        <div class="flex flex-row gap-4">
          <div class="w-4 h-4 rounded-xl" style="background-color: {c.value}"/> {c.name}
        </div>
      </DropdownItem>
    {/each}
  </Dropdown>
</template>
