<script lang="ts">
  import { Clock } from 'lucide-svelte'
  import MyDate from 'lib/themes/misiki/MyDate.svelte'

  export let show:boolean = false

  function showCompenent(show) {
    return show ? "inline-block" : "hidden"
  }

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

<section class={showCompenent(show)}>
  <div id="bookaslot" class="flex flex-col divide-y-2 sm:p-4 p-2 divide-white items-center gap-8">
    <header class="font-bold sm:text-xl text-sm prose">
      What time works best for a quick video call for a virtual catchup with you soon to be pet?
    </header>

    <!-- Date Picker -->
    <div class="flex flex-row items-center sm:gap-4 gap-2">
      <button class="sm:w-12 w-4 sm:h-12 h-4 text-purple-500">
        {"<"}
      </button>
      <div class="flex flex-row sm:h-52 h-32 border-2 w-fit rounded-2xl overflow-hidden" role="group">
        {#each date as d}
          <MyDate d = "{d}" />
        {/each}
      </div>
      <button class="sm:w-12 w-4 sm:h-12 h-4 text-purple-500">
        {">"}
      </button>
    </div>

    <header class="prose font-extrabold sm:text-xl border-2 border-purple-500">
      Select a time slot
    </header>

    <div class="flex flex-row sm:gap-24 gap-4 justify-center items-center content-center p-4">
      <div class="font-bold text-base">
        Meeting with Mr.Raja
      </div>
      <div class="flex flex-row gap-1 text-gray-400">
        <Clock />
        <div class="font-bold">
          30 min meeting
        </div>
      </div>
    </div>

    <!-- Time Picker -->
    <div class="flex flex-row items-center gap-4 flex-wrap" role="group">
      {#each time as t}
        <button class="flex flex-row sm:w-44 sm:h-12 w-20 h-8 items-center content-center justify-center sm:m-4 m-3 text-red-500 bg-red-200 font-bold focus:z-10 focus:bg-red-500 focus:text-white border-2 rounded">
          {t}
        </button>
      {/each}
    </div>

    <div class="flex sm:items-end sm:justify-end sm:content-end sm:mr-8 sm:mt-8 justify-center content-center items-center m-8">
      <button class="flex bg-black text-white font-bold rounded-lg p-3 justify-center content-center items-center">
        Pay Now
      </button>
    </div>
  </div>
</section>
