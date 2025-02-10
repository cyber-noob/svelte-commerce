<script lang="ts">
  import breedIcon from 'lib/icons/breed.svg'
  import familyIcon from 'lib/icons/family.svg'
  import genderIcon from 'lib/icons/gender.svg'
  import ageIcon from 'lib/icons/age.svg'
  import colorIcon from 'lib/icons/color.svg'
  import weightIcon from 'lib/icons/weight.svg'
  import dewormingIcon from 'lib/icons/deworming.svg'
  import vaccineIcon from 'lib/icons/vaccine.svg'
  import certificateIcon from 'lib/icons/certificate.svg'
  import {slide} from 'svelte/transition'

  export let product:{}

  let showLongDescription = false;
  console.log('showLongDescription: ', showLongDescription)
</script>
<template>
  <div class="flex flex-col border-t border-b">
    <button
      type="button"
      class="py-5 w-full flex items-center gap-2 justify-between focus:outline-none"
      on:click="{() => (showLongDescription = !showLongDescription)}">
      <h5 class="uppercase">Description</h5>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5 transition duration-300
									{showLongDescription ? 'transform -rotate-45' : ''}">
        <path
          d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
        ></path>
      </svg>
    </button>

    {#if showLongDescription}
      <div transition:slide="{{ duration: 300 }}" class="pb-5 prose max-w-none">
        <div class="flex flex-row items-center">
          <img src={breedIcon} class="w-8 ml-4 mr-12">
          {product.general_info.title}
        </div>
        <div class="flex flex-row items-center">
          <img src={familyIcon} class="w-8 ml-4 mr-12">
          {product.breed}
        </div>
        <div class="flex flex-row items-center">
          <img src={genderIcon} class="w-8 ml-4 mr-12">
          {product.sex}
        </div>
        <div class="flex flex-row items-center">
          <img src={ageIcon} class="w-8 ml-4 mr-12">
          {product.age_in_days} Days
        </div>
        <div class="flex flex-row items-center">
          <img src={colorIcon} class="w-8 ml-4 mr-12">
          {product.color}
        </div>
        <div class="flex flex-row items-center">
          <img src={weightIcon} class="w-8 ml-4 mr-12">
          {product.weight_in_kg}
        </div>
        <div class="flex flex-row items-center">
          <img src={dewormingIcon} class="w-8 ml-4 mr-12">
          {product.dewormed ? "Dewormed" : "Not Dewormed"}
        </div>
        <div class="flex flex-row items-center">
          <img src={vaccineIcon} class="w-8 ml-4 mr-12">
          {product.vaccinated ? "Vaccinated" : "Not Vaccinated"}
        </div>
        <div class="flex flex-row items-center">
          <img src={certificateIcon} class="w-8 ml-4 mr-12">
          {product.certified ? "Certified" : "Not Certified"}
        </div>
      </div>
    {/if}
  </div>
</template>
