<script lang="ts">
  import sadPuppy from '$lib/assets/sad-puppy.png'

  export let data
  let allowParticipant = data.allowParticipant

  console.log('allowParticipant: ', allowParticipant)
</script>
<section class="min-h-screen w-full px-3 py-5 sm:p-10 bg-gray-100">
  {#if !allowParticipant.allowed}
    <div class="flex flex-col content-center items-center justify-center w-full">
      <img src="{sadPuppy}" alt="logo" class="pt-12"/>
      <p class="py-8 text-2xl text-black border-t-2 border-black w-full text-center">{allowParticipant?.message}</p>
    </div>
  {/if}
</section>
