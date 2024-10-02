<script>
  import MyDate from "./_MyDate.svelte";
  import { Clock } from 'lucide-svelte'
  import LazyImg from '$lib/components/Image/LazyImg.svelte'

  let date = [
    {
      day: 'Mon',
      date: 11,
      month: 'Sep',
      isEnabled: true
    },
    {
      day: 'Tue',
      date: 12,
      month: 'Sep',
      isEnabled: false
    },
    {
      day: 'Wed',
      date: 13,
      month: 'Sep',
      isEnabled: true
    },
    {
      day: 'Thu',
      date: 14,
      month: 'Sep',
      isEnabled: false
    },
    {
      day: 'Fri',
      date: 15,
      month: 'Sep',
      isEnabled: true
    },
    {
      day: 'Sat',
      date: 16,
      month: 'Sep',
      isEnabled: true
    },
    {
      day: 'Sun',
      date: 17,
      month: 'Sep',
      isEnabled: true
    },
  ]

  let time = ['7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 AM', '13:30 AM', '14:30 AM',
    '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 AM', '13:30 AM', '14:30 AM']
</script>

<section>
  <div class="flex flex-col divide-y-2 p-4 divide-white items-center gap-8">
    <header class="font-bold text-xl">
      What time works best for a quick video call for a virtual catchup with you soon to be pet?
    </header>

    <div class="flex flex-row items-center gap-4">
      <button class="w-12 h-12 border-2 rounded-2xl text-purple-500">
        {"<"}
      </button>
      <div class="flex flex-row h-52 border-2 w-fit rounded-2xl overflow-hidden">
        {#each date as d}
          <MyDate d = "{d}" />
        {/each}
      </div>
      <button class="w-12 h-12 border-2 rounded-2xl text-purple-500">
        {">"}
      </button>
    </div>

    <header class="font-bold text-xl border-2 border-purple-500">
      Select a time slot
    </header>

    <div class="flex flex-row items-center gap-40 text-base">
      <div class="text-purple-500 font-bold">
        Meeting with Mr.Raja
      </div>
      <div class="flex flex-row items-center gap-2 text-gray-500">
        <Clock />
        <div>
          30 min meeting
        </div>
      </div>
    </div>

    <div class="flex flex-row items-center gap-4 flex-wrap">
      {#each time as t}
        <div class="flex flex-row w-32 h-12 border-2 rounded font-bold bg-purple-100 text-purple-500 items-center content-center justify-center">
          {t}
        </div>
      {/each}
    </div>

    <button class="h-12 w-52 border-2 rounded-xl bg-black text-white font-bold">
      Pay Now
    </button>
  </div>
</section>
