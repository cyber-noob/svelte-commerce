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

export let product: {}
</script>
<template>
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
    {product.weight_in_kg} Kg
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
</template>
