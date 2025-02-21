<script>
  import BlogCard from './BlogCard.svelte';
  import SEO from 'lib/components/SEO/index.svelte'

  export let data
  let articles = data.latestBlogs

  const seoProps = {
    title: 'Pet Blogs & Collections',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Comprehensive blogs on a-z of pets! We cover topics on how to buy a pet, take care of it while at office, nurture, healthcare and grooming topics'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        property: 'keywords',
        content:
          'pet, pet-health, healthcare, grooming, petcare, nurture, pet-food, pet-exercise'
      },

      // OpenGraph data
      {
        hid: 'og:title',
        name: 'og_title',
        property: 'og:title',
        content: 'Pet Blogs & Collections'
      },
      {
        hid: 'og:description',
        name: 'og_description',
        property: 'og:description',
        content: 'Comprehensive blogs on a-z of pets! We cover topics on how to buy a pet, take care of it while at office, nurture, healthcare and grooming topics'
      },

      // Twitter
      {
        name: 'twitter:title',
        content: 'Comprehensive blogs on a-z of pets! We cover topics on how to buy a pet, take care of it while at office, nurture, healthcare and grooming topics'
      },
      {
        name: 'twitter:description',
        content: 'Comprehensive blogs on a-z of pets! We cover topics on how to buy a pet, take care of it while at office, nurture, healthcare and grooming topics'
      }
    ]
  }
</script>

<SEO {...seoProps} />

<div class="max-w-6xl mx-auto px-4 py-12">
  <div class="flex justify-between items-center mb-10">
    <h1 class="text-4xl font-bold text-gray-800">Curated Pet Blogs For You - An unfiltered look from previous pet parents</h1>
    <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition">
      View All
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each articles as article (article.id)}
      <BlogCard {article} />
    {/each}
  </div>
</div>
