import { redirect } from '@sveltejs/kit'
import { PetStoreAdminService } from 'lib/services'

export async function load({ locals, url }) {
  const { me, origin, sid, store, storeId } = locals

  let collections = await PetStoreAdminService.fetchProductCollections()
  let families = await PetStoreAdminService.fetchProductFamilies()

  return {
    collections,
    families,
  }
}
