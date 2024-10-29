<script lang="ts">

  import BrandCards from 'lib/themes/misiki/BrandCards.svelte'
  import TrendingPets from '$lib/assets/dressup.png'
  import { goto } from '$app/navigation'
  import GoldenRetriever from '$lib/assets/goldPup-removebg-preview.png'
  import Pug from '$lib/assets/pug-removebg-preview.png'
  import Shihtzu from '$lib/assets/shih-tzu-removebg-preview.png'

  let items = [
    {
      image: `${GoldenRetriever}`,
      title: 'GOLDEN RETRIEVER PUPPIES',
      short_summary: 'Golden Retriever are popular breed dogs in Bangalore, These are meant for apartment or silent areas in Bangalore. You can buy 45days puppy from us depending on availability. All Golden Retrievers look similar, the breed actually has three different colors -- golden, light golden, and dark golden.',
      bg_color: {
        from: 'from-red-600',
        via: 'via-red-500',
        to: 'to-red-600'
      },
      q: 'Golden Retriever Puppy',
    },

    {
      image: `${Pug}`,
      title: 'Pug',
      short_summary: 'The Pug is a breed of dog with the physically distinctive features of a wrinkly, short-muzzled face, and curled tail.',
      bg_color: {
        from: 'from-yellow-600',
        via: 'via-yellow-500',
        to: 'to-yellow-600'
      },
      q: 'Pup Puppy'
    },

    {
      image: `${Shihtzu}`,
      title: 'Shih Itzu',
      short_summary: 'The Shih Tzu is a toy dog or pet dog breed originating from Tibet and believed to be bred from the Pekingese and the Lhasa Apso.',
      bg_color: {
        from: 'from-blue-600',
        via: 'via-blue-500',
        to: 'to-blue-600'
      },
      q: 'Shih Tzu Puppy'
    }
  ]
</script>

<section class="m-8">
  <a href="/new-trending">
    <div class="flex content-center items-center h-72 bg-zinc-950 gap-4">
      <img
        alt="logo"
        src={TrendingPets}
        class="object-fill h-72"
      />
      <div class="flex w-full justify-center items-center content-center">
        <p class="text-5xl font-extrabold text-green-500">EXPLORE TRENDING PRODUCTS</p>
      </div>
    </div>
  </a>
  {#each items as item}
    <BrandCards brand={item} />
  {/each}
</section>
