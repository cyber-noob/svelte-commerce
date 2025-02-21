<script lang="ts">
  import { applyAction, enhance } from '$app/forms'
  import { onMount } from 'svelte'
  import { PetStoreAdminService } from '$lib/services'
  import { PrimaryButton, Textbox } from 'lib/ui'
  import { CustomDropDown } from 'lib/components'
  import { toast } from 'lib/utils'
  import { goto, invalidateAll } from '$app/navigation'

  export let data

  $: collection = data.collections.data
  $: family = data.families.data
  $: registry = []
  $: contract = {}
  $: productPayload = {}

  console.log('contract: ', contract)

  $: selectedCollection = null
  $: selectedFamily = null
  $: selectedRegistry = null

  let loading: boolean = false

  async function fetchContract(collection: string, family: string, registry: string) {
    contract = await PetStoreAdminService.fetchProductContract(collection, family, registry)
    contract = flatten(contract)
    delete contract['general_info.indexed']
    delete contract['general_info.uuid']
    delete contract['general_info.created_on']
    delete contract['general_info.seller_id']
    delete contract['general_info.active']
    delete contract['general_info.currency_symbol']
    delete contract['general_info.family']
    delete contract['general_info.collection']

    Object.keys(contract).forEach((key: string) => {
      if (contract[key] === 'string')
        contract[key] = 'text'
    })

  }

  const flatten = (obj, roots = [], sep = '.') => Object
    // find props of given object
    .keys(obj)
    // return an object by iterating props
    .reduce((memo, prop) => Object.assign(
      // create a new object
      {},
      // include previously returned object
      memo,
      Object.prototype.toString.call(obj[prop]) === '[object Object]'
        // keep working if value is an object
        ? flatten(obj[prop], roots.concat([prop]), sep)
        // include current prop and value and prefix prop with the roots
        : {[roots.concat([prop]).join(sep)]: obj[prop]}
    ), {})

  function unflatten(data) {
    var result = {}
    for (var i in data) {
      var keys = i.split('.')
      keys.reduce(function(r, e, j) {
        return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
      }, result)
    }
    return result
  }

</script>

<template>
  <div class="text-xl font-extrabold leading-tight tracking-wider">ADD PRODUCT</div>
  <form
    action="/admin/product/add?/upload"
    method="POST"
    enctype="multipart/form-data"
    use:enhance={ () => {
      loading = true
			return async ({ result, update }) => {
					loading = false

          console.log('r -> ', result)
          if (result.status === 401) {
            toast('Please login again.', 'error')
          }
					else if (result.status === 204) {
            toast('Product Added Successfully!', 'success')
            console.log('path: ', window.location.pathname)
            await invalidateAll()
					}
          else {
            toast('Something went wrong! Please try again or contact admin if issue persists.', 'error')
            await invalidateAll()
          }
			  }
			}
    }
  >
    <div class="flex flex-col h-full m-8 p-8 gap-8">
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
        <h6 class="sm:w-60 sm:shrink-0">
          Product Category

          <span class="text-accent-500">*</span>
        </h6>

        <div class="w-full">
          <select
            class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:bg-zinc-50"
            bind:value="{selectedCollection}"
            on:change="{async () => {
            registry = await PetStoreAdminService.fetchProductRegistries(selectedCollection)
            registry = registry.data
            console.log('reg: ', registry)
            productPayload['general_info.collection'] = selectedCollection
          }}"
            required>
            <option value="{null}" disabled selected>-- Select Product Category --</option>
            {#each collection as s}
              {#if s}
                <option value="{s}">
                  {s.toUpperCase()}
                </option>
              {/if}
            {/each}
          </select>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
        <h6 class="sm:w-60 sm:shrink-0">
          Family

          <span class="text-accent-500">*</span>
        </h6>

        <div class="w-full">
          <select
            class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:bg-zinc-50"
            bind:value="{selectedFamily}"
            on:change="{() => {
            console.log('collection: ', selectedFamily)
            productPayload['general_info.family'] = selectedFamily
            fetchContract(selectedCollection, selectedFamily, selectedRegistry)
            }}"
            required>
            <option value="{null}" disabled selected>-- Select Family --</option>
            {#each family as s}
              {#if s}
                <option value="{s}">
                  {s.toUpperCase()}
                </option>
              {/if}
            {/each}
          </select>
        </div>
      </div>

      {#if selectedCollection !== null && selectedCollection !== 'Pet_Collection'}
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
          <h6 class="sm:w-60 sm:shrink-0">
            Product Registry
          </h6>

          <div class="w-full">
            <select
              class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:bg-zinc-50"
              bind:value="{selectedRegistry}"
              on:change="{() => {
              console.log('collection: ', selectedRegistry)
              fetchContract(selectedCollection, selectedFamily, selectedRegistry)
            }}"
            >
              <option value="{null}" disabled selected>-- Select Product Registry --</option>
              {#each registry as s}
                {#if s}
                  <option value="{s}">
                    {s.toUpperCase()}
                  </option>
                {/if}
              {/each}
            </select>
          </div>
        </div>
      {/if}

      {#if Object.keys(contract).length > 0}
        {#each Object.keys(contract) as key}
          {#if typeof contract[key] === 'string' || contract[key] instanceof String}
            <div class="w-full">
              <Textbox
                type='{contract[key]}'
                placeholder="{key.split('.').at(-1)}"
                bind:value="{productPayload[key]}"
                autoFocus
                required
                 />
            </div>
          {:else if Array.isArray(contract[key]) && key !== 'color' && key !== 'weight_in_kg'}
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
                <h6 class="sm:w-60 sm:shrink-0">
                  {key.split('.').at(-1)}
                  <span class="text-accent-500">*</span>
                </h6>

                <div class="w-full">
                  <select
                    class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:bg-zinc-50"
                    bind:value={productPayload[key]}
                    on:change="{() => {
            console.log('payload: ', unflatten(productPayload))
          }}" required>
                    <option value="{null}" disabled selected>-- Select {key.split('.').at(-1)} --</option>
                    {#each contract[key] as s}
                      <option value="{s}">
                        {s}
                      </option>
                    {/each}
                  </select>
                </div>
              </div>
          {:else if key === 'color'}
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <h6 class="sm:w-60 sm:shrink-0">
                {key}
                <span class="text-accent-500">*</span>
              </h6>

              <CustomDropDown colors={contract[key]} payload={productPayload}/>
            </div>
            {:else if key === 'weight_in_kg'}
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <h6 class="sm:w-60 sm:shrink-0">
                {key}
                <span class="text-accent-500">*</span>
              </h6>

              <div class="w-full">
                <select
                  class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:bg-zinc-50"
                  bind:value={productPayload[key]}
                  on:change="{() => {
                    console.log('payload: ', unflatten(productPayload))
                  }}" required>
                  <option value="{null}" disabled selected>-- Select {key} --</option>
                  {#each contract[key] as s}
                    <option value={s.id} label={s.range} />
                  {/each}
                </select>
              </div>
            </div>
          {/if}
        {/each}
      {/if}

      <input type="hidden" name="category" value="{selectedCollection || null}" />
      <input type="hidden" name="family" value="{selectedFamily || null}" />
      <input type="hidden" name="registry" value="{selectedRegistry || null}" />

      <input type="hidden" name="payload" value="{JSON.stringify(unflatten(productPayload)) || null}" />

      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        multiple
        required
      />

      <PrimaryButton
        type="submit"
        class="w-80
        {loading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:opacity-80 active:scale-95'}"
      >
        {loading ? 'Adding Product Please Wait...' : 'Sumbit'}
      </PrimaryButton>
    </div>
  </form>
</template>
