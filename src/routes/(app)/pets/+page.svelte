<script lang="ts">

  import BrandCards from 'lib/themes/misiki/BrandCards.svelte'
  import TrendingPets from '$lib/assets/dressup.png'
  import { goto } from '$app/navigation'
  import GoldenRetriever from '$lib/assets/golden-retriever.jpg'
  import Pug from '$lib/assets/pug.jpg'
  import Shihtzu from '$lib/assets/shih-tzu.jpg'

  let items = [
    {
      image: `${GoldenRetriever}`,
      title: 'Golden Retriever',
      short_summary: 'Golden Retriever are popular breed dogs in Bangalore, These are meant for apartment or silent areas in Bangalore. You can buy 45days puppy from us depending on availability. All Golden Retrievers look similar, the breed actually has three different colors -- golden, light golden, and dark golden.',
      bg_color: {
        from: 'from-red-800',
        via: 'via-red-500',
        to: 'to-red-800'
      },
      q: 'Golden Retriever Puppy',
    },

    {
      image: `${Pug}`,
      title: 'Pug',
      short_summary: 'The Pug is a breed of dog with the physically distinctive features of a wrinkly, short-muzzled face, and curled tail.',
      bg_color: {
        from: 'from-yellow-800',
        via: 'via-yellow-500',
        to: 'to-yellow-800'
      },
      q: 'Pup Puppy'
    },

    {
      image: `${Shihtzu}`,
      title: 'Shih Itzu',
      short_summary: 'The Shih Tzu is a toy dog or pet dog breed originating from Tibet and believed to be bred from the Pekingese and the Lhasa Apso.',
      bg_color: {
        from: 'from-blue-800',
        via: 'via-blue-500',
        to: 'to-blue-800'
      },
      q: 'Shih Tzu Puppy'
    }
  ]
</script>

<section class="sm:m-8">
  <a href="/new-trending">
    <div class="flex content-center items-center bg-zinc-950 border-b-2">
      <img
        alt="logo"
        src={TrendingPets}
        class="object-fill sm:h-72 h-44"
      />
      <div class="flex w-full justify-center items-center content-center">
        <p class="sm:text-5xl text-xl font-extrabold text-green-500">EXPLORE TRENDING PRODUCTS</p>
      </div>
    </div>
  </a>

  <div class="flex flex-col p-4">
    <div class="text-3xl font-extrabold capitalize tracking-wider gap-4 text-red-600">TOP PUPPIES</div>
    <div class="flex flex-row flex-wrap items-center content-end sm:gap-12 gap-4 sm:m-4 w-full">
      {#each items as item}
        <BrandCards brand={item} />
      {/each}
    </div>
  </div>
</section>
