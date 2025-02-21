<style>
  div#stripes {
    background-image: linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, #fff);
    background-size: 50px 50px;
  }
</style>

<script lang="ts">
  import { Clock } from 'lucide-svelte'
  import Cookie from 'cookie-universal'
  import { fetchSlots, reserveSlot } from 'lib/services/petstore/slot-service'
  import { goto } from '$app/navigation'
  import { fireGTagEvent } from 'lib/utils/gTagB'
  import { PetStoreOrderService } from 'lib/services'
  import { toast } from 'lib/utils'
  import { onMount } from 'svelte'
  import { OrderTypes } from 'lib/services/petstore/order-service'
  import { Toast } from 'flowbite-svelte'
  import { fade } from 'svelte/transition'
  import { readable } from 'svelte/store'
  import { page } from '$app/stores'

  export let show: boolean = false
  export let seller: string
  export let product: string
  export let data: {}

  let cookies = Cookie()
  let me = cookies.get('me')

  function showCompenent(show) {
    return show ? 'inline-block' : 'hidden'
  }

  $: slots = {}
  $: selectedDate = {}
  $: selectedSlot = ''

  let currentDate = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let date = []

  for (let i = 1; i <= 7; i++) {
    const d = new Date(currentDate.setDate(currentDate.getDate() + 1))
    const day = days[d.getDay()]
    const m = d.getMonth()
    const month = months[m]
    date.push({
      day: day,
      month: month,
      date: d.getDate(),
      dateString: d.getFullYear() + '-' + (m + 1) + '-' + d.getDate()
    })
  }

  $: loading = false

  async function submit(date: string, slot: string) {
    if (selectedSlot === '')
      toast('Please select an available slot', 'error')

    try {
      console.log('On Razorpay method ....')
      loading = true

      const rp = await PetStoreOrderService.createSlotOrder(cookies.get('me').token, {
        'seller-id': seller,
        'product-id': product,
        'date': date,
        'slot': slot
      })
      let orderNo = rp?.order_no || rp?.orderNo || rp?.id || ''

      if (orderNo === '')
        toast('Something went wrong', 'error')

      console.log('order no: ', orderNo)
      const options = {
        key: "rzp_test_fJLPcc02TCY2NS", // Enter the Key ID generated from the Dashboard
        description: `Order ${orderNo}`,
        amount: rp.amount,
        order_id: rp.id,
        async handler(response) {
          try {
            const capture = await PetStoreOrderService.validatePayment(cookies.get('me').token, {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }, OrderTypes.videoCall)

            console.log('capture: ', capture)
            toast('Payment success', 'success')
            goto(
              `/payment/process?pg=razorpay&order_no=${orderNo}`
            )
              .then(() => console.log('Navigated to payment page successfully ....'))
              .catch((error) => console.error('failed to navigate: ', error))
          } catch (e) {
            data.err = e
          } finally {
          }
        },
        prefill: {
          name: `${data.me.firstName} ${data.me.lastName}`,
          phone: data.me.phone,
          email: data.me?.email || data.cart?.shipping_address?.email || 'help@litekart.in',
          contact: data.me.phone || data.cart?.shipping_address?.phone
        }
      }
      const rzp1 = new Razorpay(options)
      rzp1.open()
    } catch (e) {
      console.log('slot booking error: ', e)
      toast(`Payment failed, please try again`, 'error')
    } finally {
      loading = false
    }
  }

  let razorpayReady = false

  function onDateSelected(date) {
    console.log('Fetching slots for date - ', date)

    if (!me){
      toast('Please login to continue','error')
      goto(`/auth/login?ref=${$page?.url?.pathname}`)
      return
    }

    try {
      slots = fetchSlots(me.token, seller, date.dateString)
      selectedDate = date
    } catch (error) {
      console.log(error)
      if (error.status === 401)
        goto(`/auth/login?ref=${$page?.url?.pathname}`)
      else
        toast('Something went wrong', 'error')
    }
  }

  async function onSlotSelected(slot) {
    console.log('reserving slot: ', slot)

    if (!me){
      toast('Please login to continue','error')
      goto(`/auth/login?ref=${$page?.url?.pathname}`)
      return
    }

    try {
      slots = await reserveSlot(cookies.get('me').token, seller, selectedDate.dateString, slot.slot)

      if (slots.code === 'AlreadyBooked')
        toast('Slot Already Booked. New Available slots updated for you. Please select another slot', 'error')
      else
        selectedSlot = slot.slot
    } catch (error) {
      console.log(error)
      if (error.status === 401)
        goto(`/auth/login?ref=${$page?.url?.pathname}`)
      else
        toast('Something went wrong', 'error')
    }
  }

  let text = readable(['Contacting Seller...', 'Working on slots...', 'Making sure the slot is yours....', 'Please wait a little longer...'])
  let currentIndex = 0;

  let displayedText;
  $: displayedText = $text[currentIndex % $text.length]

  onMount(async () => {

    const razorpayScript = document.createElement('script')
    razorpayScript.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js')
    document.head.appendChild(razorpayScript)
    razorpayReady = true
  })
</script>

<section class={showCompenent(show)}>
  <div id="bookaslot" class="flex flex-col divide-y-2 sm:p-4 p-2 divide-white items-center gap-8">
    <header class="font-bold sm:text-xl text-sm prose">
      What time works best for a quick video call for a virtual catchup with you soon to be pet?
    </header>

    <!-- Date Picker -->
    <div class="flex flex-row items-center sm:gap-4 gap-2">
      <div class="flex flex-row flex-1 sm:h-52 h-28 w-full border-2 justify-evenly overflow-hidden" role="group">
        {#each date as d}
          <div class="flex flex-col sm:w-32 w-14 justify-center content-center items-center">
            <div class="flex flex-row sm:h-16 h-20 w-full justify-center content-center items-center">
              {d.day}
            </div>

            {#if Object.keys(selectedDate).length !== 0 && selectedDate?.dateString === d.dateString}
              <div
                class="flex flex-col h-full w-full font-bold justify-center content-center items-center focus:z-10 bg-red-500 text-white">
                <div class="text-2xl">
                  {d.date}
                </div>
                <div class="text-xs">
                  {d.month}
                </div>
              </div>
            {:else}
              <button
                on:click="{async () => {
                onDateSelected(d)
              }}"
                class="flex flex-col h-full w-full font-bold justify-center content-center items-center text-red-500 focus:z-10 focus:bg-red-500 focus:text-white">
                <div class="text-2xl">
                  {d.date}
                </div>
                <div class="text-xs">
                  {d.month}
                </div>
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    {#await slots}
      {#key displayedText}
        <div class="text-xs font-bold" in:fade>{displayedText}</div>
        {setTimeout(function () {
          currentIndex++
        }, 5000)}
      {/key}
    {:then slots}
    {#if Object.keys(slots).length !== 0}
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
      {#if slots?.slots.length > 0}
        <div class="flex flex-row items-center gap-2 flex-wrap" role="group">
          {#each slots?.slots as t}
              {#if t.is_available }
                  <button
                    on:click="{async () => onSlotSelected(t)}"
                    class="flex flex-row items-center content-center justify-center text-zinc-900 bg-white focus:bg-zinc-900 focus:text-white focus:z-10 border-2 border-zinc-100 shadow-xl font-semibold p-4 w-full sm:w-52 m-2 sm:m-4 rounded-xl">
                    {t.slot}
                  </button>
              {:else}
                <button disabled
                        class="flex flex-row items-center content-center justify-center text-zinc-900 bg-white disabled:bg-gray-200 focus:bg-zinc-900 focus:text-white focus:z-10 border-zinc-900 shadow-xl font-semibold p-4 w-full sm:w-52 m-2 sm:m-4 rounded-xl">
                  {t.slot}
                </button>
              {/if}
          {/each}
        </div>
      {:else}
        No available slots for the selected day...
      {/if}

      <div
        class="flex sm:items-end sm:justify-end sm:content-end sm:mr-8 sm:mt-8 justify-center content-center items-center m-8">
        <button
          on:click={async () => {
            loading = true
            await submit(selectedDate.dateString, selectedSlot)
            loading = false
          }}
          class="flex bg-black text-white font-bold rounded-lg p-3 justify-center content-center items-center disabled:bg-gray-200"
          disabled={loading}
        >
          Pay Now
        </button>
      </div>
    {/if}
      {:catch e}
        <Toast>Something went wrong. Please try again later</Toast>
      {/await}
  </div>
</section>
