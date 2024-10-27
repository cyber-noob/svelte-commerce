<script lang="ts">
  import HeaderImg from '$lib/assets/dogg-removebg-preview.png'
  import RoundTable from '$lib/assets/round-table.jpg'
  import OwnPuppy from '$lib/icons/own_puppy.svg'
  import Accessories from '$lib/icons/puppy_accessories.svg'
  import Health from '$lib/icons/puppy_health.svg'
</script>
<section class="m-8">
  <div class="flex content-center items-center h-72 bg-zinc-950">
    <img
      alt="logo"
      src={HeaderImg}
      class="object-fill h-72"
    />
    <p class="text-5xl font-extrabold text-white">YOUR ONE STOP SHOP</p>
  </div>
  <div id="our story" class="flex mt-8">
    <img
      alt="logo"
      src={RoundTable}
    />
    <div class="m-8">
      <div class="text-zinc-900 text-3xl font-bold border-l-4 border-green-400 p-4">
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
  <div class="mt-8 border-l-4 border-green-400 text-zinc-900 text-3xl p-4">
    OUR EXPERT SERVICES
  </div>
  <div class="flex flex-row flex-wrap mt-8">
    <div class="flex w-96 h-32 bg-gray-200 p-4 m-4">
      <div class="flex items-center">
        <img
          src={OwnPuppy}
          alt="logo"
          class="w-16 h-16"
        />
      </div>
      <div class="flex flex-col ml-8">
        <div class="border-l-4 border-green-400 text-zinc-900 text-xl font-bold pl-4 mt-4">First Time Pet Owner ?</div>
        <div class="mt-4 prose max-w-none text-sm text-zinc-500">
          Read our curated blogs about your new lil companion
        </div>
      </div>
    </div>

    <div class="flex w-96 h-32 bg-gray-200 p-4 m-4">
      <div class="flex items-center">
        <img
          src={OwnPuppy}
          alt="logo"
          class="w-16 h-16"
        />
      </div>
      <div class="flex flex-col ml-8">
        <div class="border-l-4 border-green-400 text-zinc-900 text-xl font-bold pl-4 mt-4">Buy Puppy</div>
        <div class="mt-4 prose max-w-none text-sm text-zinc-500">
          Click here to explore pets catalog
        </div>
      </div>
    </div>

    <div class="flex w-96 h-32 bg-gray-200 p-4 m-4">
      <div class="flex items-center">
        <img
          src={Accessories}
          alt="logo"
          class="w-16 h-16"
        />
      </div>
      <div class="flex flex-col ml-8">
        <div class="border-l-4 border-green-400 text-zinc-900 text-xl font-bold pl-4 mt-4">Puppy Accessories</div>
        <div class="mt-4 prose max-w-none text-sm text-zinc-500">
          Click here to explore unique and exciting pet accessories
        </div>
      </div>
    </div>

    <div class="flex w-96 h-32 bg-gray-200 p-4 m-4">
      <div class="flex items-center">
        <img
          src={Health}
          alt="logo"
          class="w-16 h-16"
        />
      </div>
      <div class="flex flex-col ml-8">
        <div class="border-l-4 border-green-400 text-zinc-900 text-xl font-bold pl-4 mt-4">Health Care</div>
        <div class="mt-4 prose max-w-none text-sm text-zinc-500">
          Click here to book an appointment with a vetenerian and for pet consultation
        </div>
      </div>
    </div>

    <div class="flex w-96 h-32 bg-gray-200 p-4 m-4">
      <div class="flex items-center">
        <img
          src={OwnPuppy}
          alt="logo"
          class="w-16 h-16"
        />
      </div>
      <div class="flex flex-col ml-8">
        <div class="border-l-4 border-green-400 text-zinc-900 text-xl font-bold pl-4 mt-4">Grooming</div>
        <div class="mt-4 prose max-w-none text-sm text-zinc-500">
          Click here for pet grooming
        </div>
      </div>
    </div>
  </div>
</section>
