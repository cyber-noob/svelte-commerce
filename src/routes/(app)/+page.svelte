<script lang="ts">
  import HeaderImg from '$lib/assets/dogg-removebg-preview.png'
  import RoundTable from '$lib/assets/round-table.jpg'
  import OwnPuppy from '$lib/icons/own_puppy.svg'
  import Accessories from '$lib/icons/puppy_accessories.svg'
  import Health from '$lib/icons/puppy_health.svg'

  const services = [
    {
      title: 'First Time Pet Owner ?',
      description: 'Read our curated blogs about your new lil companion',
      img: `${OwnPuppy}`,
      link: '/pets'
    },

    {
      title: 'Buy Puppy ?',
      description: 'Click here to explore our wide variety of puppies',
      img: `${Accessories}`,
      link: '/pets'
    },

    {
      title: 'Puppy Accessories',
      description: 'Click here to explore unique and exciting pet accessories',
      img: `${Accessories}`,
      link: '/pets'
    },

    {
      title: 'Health Care',
      description: 'Click here to book an appointment with a vetenerian and for pet consultation',
      img: `${Health}`,
      link: '/pets'
    },

    {
      title: 'Grooming',
      description: 'Click here for pet grooming',
      img: `${Health}`,
      link: '/pets'
    }
  ]
</script>
<section class="sm:m-8">
  <div class="flex content-center items-center sm:h-72 h-24 sm:w-full w-full bg-zinc-950">
    <img
      alt="logo"
      src={HeaderImg}
      class="object-fill sm:h-72 h-24"
    />
    <p class="sm:text-5xl text-xl font-extrabold text-white">YOUR ONE STOP SHOP</p>
  </div>
  <div id="our story" class="flex sm:flex-row flex-col mt-8 p-4">
    <img
      alt="logo"
      src={RoundTable}
      class="w-full"
    />
    <div class="sm:m-8 mt-8">
      <div class="sm:w-full w-full text-zinc-900 text-3xl font-bold border-l-4 border-green-400 sm:p-4 p-2">
        OUR STORY
      </div>
      <div class="prose max-w-none text-lg text-zinc-500 mt-4">
        We are a bunch of passionate folks who banded together over our love n hate relationship
        with buying and owning pets but spending our limited time over research weren't feasible.
        And so --title-- came by here to provide you one stop shop on owning and
        maintaing your cuddly little companions!
      </div>
      <div class="mt-8">
        Read More about our story below:
        <p class="underline underline-offset-8 text-blue-500">Click here ...</p>
      </div>
    </div>
  </div>
  <div class="mt-8 border-l-4 border-green-400 text-zinc-900 sm:text-3xl text-xl p-4 ml-4">
    OUR EXPERT SERVICES
  </div>
  <div class="flex flex-row flex-wrap mt-8 justify-center items-center content-center">
    {#each services as service}
      <a href={service.link}>
        <div class="flex sm:w-96 w-80 sm:h-32 bg-zinc-100 border-2 border-green-400 p-4 m-4">
          <div class="flex items-center">
            <img
              src={service.img}
              alt="logo"
              class="sm:w-16 w-12 sm:h-16 h-12 aspect-square"
            />
          </div>
          <div class="flex flex-col ml-8">
            <div class="border-l-4 border-green-400 text-zinc-900 sm:text-xl text-lg font-bold sm:pl-4 pl-2 sm:mt-4 mt-2">{service.title}</div>
            <div class="sm:mt-4 mt-2 prose max-w-none text-sm text-zinc-500">
              {service.description}
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>
