<script lang="ts">
  import checkMark from '$lib/assets/check-mark.svg'
  import * as step from 'lib/config'

  let steps = [
    {
      id: 1,
      title: 'Stage 1',
      description: 'General Info',
    },

    {
      id: 2,
      title: 'Stage 2',
      description: 'Product Details Confirmation',
    },

    {
      id: 3,
      title: 'Stage 3',
      description: 'Select A Date',
    },

    {
      id: 4,
      title: 'Stage 4',
      description: 'Select an available slot'
    }
  ]

  $: currentStep = 1
</script>

<template>
  <div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col w-1/4 border-r-2 p-4 gap-12 justify-center">
      {#each steps as step}
        <div class="flex flex-col gap-4 ml-4">
          {#if currentStep > step.id}
            <img class="w-6 h-6 rounded-2xl bg-blue-600" src={checkMark} alt="check mark" />
          {:else if currentStep === step.id}
            <div class="w-6 h-6 border-2 rounded-2xl bg-blue-600" />
          {:else}
            <div class="w-6 h-6 border-2 rounded-2xl" />
          {/if}
          <div class="flex flex-col gap-2">
            <div class="prose font-extrabold">{step.title}</div>
            <div class="prose text-sm text-zinc-300">{step.description}</div>
          </div>
          {#if step.id !== 4}
            {#if currentStep > step.id}
              <div class="h-20 border-l-4 border-blue-600 ml-2.5" />
            {:else}
              <div class="h-20 border-l-4 ml-2.5" />
            {/if}
          {/if}
        </div>
      {/each}
    </div>

    {#if currentStep === 1}
      <div class="flex flex-col gap-4">
        <div class="prose font-extrabold">How it Works...</div>
        <div class="prose text-sm text-zinc-500">Setup a video Consultation with us.</div>
        <div class="prose text-sm text-zinc-500">Check out your to be pet over a video call and we make sure the same little guy is brought to you to your home!</div>
        <div class="prose text-sm text-zinc-500">You can query anything be it about selecting your ideal pet, how to nurture and take care of your pet, vaccination etc</div>
        <button class="w-32 rounded p-2 bg-blue-600 text-white mt-6"
                on:click={() => {
                  currentStep = 2
                  console.log(currentStep)
                }}
        >
          Next
        </button>
      </div>
    {/if}
  </div>
</template>
