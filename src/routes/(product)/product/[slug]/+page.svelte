<script lang="ts">
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { ProductDetails } from '$lib/theme-config'
import { ProductService, ReviewService, WishlistService } from '$lib/services'

export let data: any = {}

console.log('pdp data: ', data)
</script>

<ProductDetails {data} />
