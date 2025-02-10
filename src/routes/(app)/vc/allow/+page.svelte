<script lang="ts">

  import { PetStoreVideoCallService } from 'lib/services'
  import { redirect } from '@sveltejs/kit'
  import { onMount } from 'svelte'
  import { toast } from 'lib/utils'
  import { goto } from '$app/navigation'

  export let data
  const COUNTDOWN_DAYS = 1;

  // initialize the counter object
  let counterObject = {}
  let res = data.allowParticipant
  let me = data.me

  if (!res.isAllowed && res.hasOwnProperty('duration')) {
    counterObject = res.duration
  }

  $: isAllowed = false

  // update the countdown every second
  let countdown = setInterval(updateCountdown, 1000);

  let currentDate = new Date();

  let targetTime = currentDate.setDate(currentDate.getDate() - counterObject.days)
  targetTime = currentDate.setHours(currentDate.getHours() + counterObject.hours, currentDate.getMinutes() + counterObject.minutes, currentDate.getSeconds() + counterObject.seconds)
  // console.log('targetTime: ', targetTime)

  function updateCountdown() {

    // console.log('time: ', currentDate.getTime())
    let timeDifference = targetTime - new Date().getTime();
    // console.log('diff => ', timeDifference)

    if (timeDifference <= 0) {
      clearInterval(countdown); // stop the countdown when the target date is reached
      counterObject = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }

      console.log('countdown stop trigger: ', timeDifference)
      isAllowed = true
      return;
    } else {
      let remainingDays = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
      );
      let remainingHours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let remainingMinutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let remainingSeconds = Math.floor(
        (timeDifference % (1000 * 60)) / 1000
      );

      // If the remaining time is less than 10, add a leading zero to the string and convert it to a string

      const remainingDaysString = remainingDays > 10 ? remainingDays.toString(): "0" + remainingDays.toString();
      const remainingHoursString = remainingHours > 10 ? remainingHours.toString(): "0" + remainingHours.toString();
      const remainingMinutesString = remainingMinutes > 10 ? remainingMinutes.toString(): "0" + remainingMinutes.toString();
      const remainingSecondsString = remainingSeconds > 10 ? remainingSeconds.toString(): "0" + remainingSeconds.toString();

      // Display the results in the UI

      counterObject.days = remainingDaysString;
      counterObject.hours = remainingHoursString;
      counterObject.minutes = remainingMinutesString;
      counterObject.seconds = remainingSecondsString;
    }
  }


  $: onTimeout(isAllowed)

  async function onTimeout(allowed: boolean) {

    if (allowed) {
      toast('Redirecting you to the meeting', 'success')

      let allowParticipant = await PetStoreVideoCallService.allowParticipant(me.token, {
        id: data.participant_id,
        order_id: data.vc_order_id,
      })

      console.log('a => ', allowParticipant)

      if (allowParticipant.allowed)
        window.location = allowParticipant.url
    } else
      toast('Something went wrong. Please reload the page', 'error')
  }
</script>

<main>
  <div class="flex flex-col h-screen gap-4 justify-center content-center text-center items-center">
    {#if !res.isAllowed}
      {#if res.hasOwnProperty('duration')}
        <div class="text-xl prose font-semibold tracking-wider">Hey, Looks like you are early! Please reload the page when the timer runs out if you aren't redirected automatically</div>
        <div class="flex flex-row gap-4">
          {#each Object.keys(counterObject) as key}
            <div class="flex flex-col gap-4 justify-center content-center text-center">
              <h2 class="text-6xl font-extrabold text-white w-32 h-32 bg-zinc-500 flex flex-col justify-center text-center rounded-xl">{counterObject[key]}</h2>
              <p class="font-semibold tracking-wide">{key.toUpperCase()}</p>
            </div>
          {/each}
        </div>
      {:else }
        <div class="text-xl prose font-semibold tracking-wider">Hey, Meeting has ended! We hope you had a great experience with us!</div>
      {/if}
    {/if}
  </div>
</main>
