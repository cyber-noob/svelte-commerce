<script lang="ts">
  import PetFam from '$lib/assets/fam.jpg'
  import PuppyService from '$lib/assets/buy_puppy.jpg'
  import PetAccessories from '$lib/assets/pet_accessories.jpg'
  import PetGrooming from '$lib/assets/pet_spa.jpeg'
  import Blog from '$lib/assets/blog.jpg'
</script>
<section class="flex flex-col sm:gap-8 gap-4 sm:m-8 m-4">
  <div class="relative">
    <img src={PetFam} alt="logo">
    <div class="absolute inset-0 bg-gray-700 opacity-40"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <h2 class="font-romantis animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 sm:text-5xl text-xl text-white font-bold">Your new cute little companion awaits ♥</h2>
    </div>
  </div>
  <div id="services" class="flex flex-row flex-wrap sm:gap-8 gap-2 justify-center overflow-x-auto">
    <a href="/pets">
      <div class="relative sm:w-80 w-32">
        <img src={PuppyService} alt="logo">
        <div class="absolute inset-0 bg-gray-700 opacity-40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <h2 class="font-romantis text-white sm:text-xl text-base">Buy Pets</h2>
        </div>
      </div>
    </a>
    <a href="/pets">
      <div class="relative sm:w-80 w-32">
        <img src={PetAccessories} alt="logo">
        <div class="absolute inset-0 bg-gray-700 opacity-40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <h2 class="font-romantis text-white sm:text-xl text-base">Buy Pet Accessories</h2>
        </div>
      </div>
    </a>
    <a href="/pets">
      <div class="relative sm:w-80 w-32">
        <img src={PetGrooming} alt="logo">
        <div class="absolute inset-0 bg-gray-700 opacity-40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <h2 class="font-romantis text-white sm:text-xl text-base">Pet Grooming</h2>
        </div>
      </div>
    </a>
  </div>
  <div class="relative">
    <img src={Blog} alt="logo">
    <div class="absolute inset-0 bg-gray-700 opacity-40"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <h2 class="font-romantis text-white">Learn More About Your Favorite pet</h2>
    </div>
  </div>
</section>
