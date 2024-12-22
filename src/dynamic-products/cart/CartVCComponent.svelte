<script lang="ts">
  import { currency, date } from 'lib/utils'
  import productVeg from 'lib/assets/product/veg.png'
  import productNonVeg from 'lib/assets/product/non-veg.png'
  import { LazyImg } from 'lib/components'

  export let order: {}
</script>
<template>
  <!-- Desktop UI of order -->
  <li class="mb-4 hidden sm:mb-10 xl:block">
    <div class="mb-3 flex items-center justify-between text-zinc-500 sm:mb-4">
      <p>Order No : #{order?.orderNo || '_'}</p>

      <p>Order Date : {date(order?.createdAt) || '-'}</p>
    </div>

    <table
      class="group min-w-full divide-y divide-zinc-200 rounded border border-zinc-200 shadow-md">
      <thead class="whitespace-nowrap rounded-t-md bg-zinc-100 text-xs uppercase">
      <tr>
        <!-- <th class="px-5 py-3 text-zinc-500"> # </th> -->

        <th class="p-3 text-zinc-500"> Image</th>

        <th class="p-3 text-zinc-500"> Name</th>

        <th class="p-3 text-zinc-500"> Category</th>

        <th class="p-3 text-zinc-500"> Slot Start</th>

        <th class="p-3 text-zinc-500"> Slot End</th>
      </tr>
      </thead>

      <tbody
        class="cursor-pointer divide-y divide-zinc-200 rounded-b-md bg-white text-sm transition duration-300 group-hover:bg-primary-50">
      <tr>
        <td class="p-3">
          <div class="shrink-0">
            {#if order?.product?.general_info?.photos.length > 0}
              <LazyImg
                src="{order?.product?.general_info?.photos[0].url}"
                alt=" "
                width="56"
                class="h-auto w-14 object-contain object-top" />
            {:else}
              <div
                class="w-20 h-20 rounded bg-zinc-200 flex items-center flex-col justify-center p-2 text-center text-xs text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>

                <span>No Image</span>
              </div>
            {/if}
          </div>
        </td>

        <td class="p-3">
          <div class="flex w-60 items-center gap-2">
            <span>{order?.product?.general_info?.title || '_'}</span>
          </div>
        </td>

        <td class="whitespace-nowrap p-3">
          Video Call
        </td>

        <td class="whitespace-nowrap p-3">
          {order?.slot_start || '_'}
        </td>

        <td class="whitespace-nowrap p-3">
          {order?.slot_end || '_'}
        </td>
      </tr>
      </tbody>
    </table>
  </li>

  <!-- Mobile UI of order -->

  <li class="block xl:hidden">
    <div class="mb-3 flex items-center justify-between sm:mb-4 text-zinc-500">
      <p>
        Order No :
        {order?.orderNo || '_'}
      </p>

      <p>
        {date(order?.createdAt)}
      </p>
    </div>

    <a
      href="/my/orders/{order.orderNo}"
      aria-label="orders"
      class="mb-4 block w-full divide-y rounded border bg-white text-sm shadow transition duration-300 hover:bg-primary-50 sm:mb-10">
      <div class="flex items-start gap-2 p-4 sm:gap-5">
        <div class="shrink-0">
          {#if order?.product?.general_info?.photos.length > 0}
            <LazyImg
              src="{order?.product?.general_info?.photos[0].url}"
              alt=" "
              width="56"
              class="h-auto w-14 object-contain object-top" />
          {:else}
            <div
              class="w-20 h-20 rounded bg-zinc-200 flex items-center flex-col justify-center p-2 text-center text-xs text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                ></path>
              </svg>

              <span>No Image</span>
            </div>
          {/if}
        </div>

        <div class="w-full flex-1">
          <div class="mb-2 flex items-start justify-between">
            <p class="flex-1">{order?.product?.general_info?.title || '_'}</p>
          </div>

          <div class="flex flex-wrap gap-y-1 gap-x-3">
            <div class="flex items-center gap-2">
              <p>Category :</p>

              <b>
                Video Call
              </b>
            </div>
            <div class="flex items-center gap-2">
              <p>Slot Start :</p>

              <b>
                {order?.slot_start || '_'}
              </b>
            </div>

            <div class="flex items-center gap-2">
              <p>Slot End :</p>

              <b>
                {order?.slot_end || '_'}
              </b>
            </div>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>
