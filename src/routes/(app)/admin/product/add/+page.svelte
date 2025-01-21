<script lang="ts">
  import { applyAction, enhance } from '$app/forms'
  import { onMount } from 'svelte'
  import { PetStoreAdminService } from '$lib/services'
  import { PrimaryButton, Textbox } from 'lib/ui'

  export let data

  let collection:string[] = data.collections.data
  let family:string[] = data.families.data
  $: registry = []
  $: contract = {}
  let productPayload = {}

  let selectedCollection:string
  let selectedFamily:string
  let selectedRegistry:string

  async function fetchContract(collection: string, family: string, registry: string) {
    contract = await PetStoreAdminService.fetchProductContract(collection, family, registry)
    contract = flatten(contract)
    delete contract['general_info.indexed']
    delete contract['general_info.uuid']
    delete contract['general_info.created_on']
    delete contract['general_info.seller_id']
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
  <form
    action="/admin/product/add?/upload"
    method="POST"
    enctype="multipart/form-data"
    use:enhance="{() => {
			return async ({ result }) => {
          console.log(result)
			  }
			}
    }"
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

      {#if Object.keys(contract).length > 0}
        {#each Object.keys(contract) as key}
          {#if contract[key] === 'input'}
            <div class="w-full">
              <Textbox
                type="text"
                placeholder="{key}"
                bind:value="{productPayload[key]}"
                autoFocus
                required
                 />
            </div>
          {:else if Array.isArray(contract[key])}
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <h6 class="sm:w-60 sm:shrink-0">
                {key}
                <span class="text-accent-500">*</span>
              </h6>

              <div class="w-full">
                <select
                  class="w-full rounded border border-zinc-200 bg-white p-2 text-sm placeholder-zinc-400 transition duration-300 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:bg-zinc-50"
                  bind:value="{productPayload[key]}"
                  on:change="{() => {
            console.log('payload: ', unflatten(productPayload))
            // fetchContract(selectedCollection, selectedFamily, selectedRegistry)
          }}" required>
                  <option value="{null}" disabled selected>-- Select {key} --</option>
                  {#each contract[key] as s}
                    <option value="{s}">
                      {s}
                    </option>
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
        class="w-80">
        Sumbit
      </PrimaryButton>
    </div>
  </form>
</template>
