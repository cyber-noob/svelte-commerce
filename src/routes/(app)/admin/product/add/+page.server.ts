import { PetStoreAdminService } from 'lib/services'
import { error } from '@sveltejs/kit'

export async function load({ locals, url }) {
  const { me, origin, sid, store, storeId } = locals

  let collections = await PetStoreAdminService.fetchProductCollections()
  let families = await PetStoreAdminService.fetchProductFamilies()

  return {
    collections,
    families,
  }
}

const upload = async ({ url, request, cookies, locals }) => {
  try {
    const data: FormData = await request.formData()
    const me:{} = JSON.parse(cookies.get('me'))
    console.log('form data: ', data)

    const tigrisBaseUri = 'https://fly.storage.tigris.dev/pethouse-puppy/'
    let photos= []

    let photosResponse = await PetStoreAdminService.addPhotos(me.token, data)
    photosResponse.files.forEach((file) => {
      photos.push({
        url: tigrisBaseUri + me.id + "/" + file
      })
    })

    let object = {};
    data.forEach((value, key) => object[key] = value)
    let json = JSON.parse(JSON.stringify(object))

    let payload = JSON.parse(json.payload)
    payload.general_info = {
      ...payload.general_info,
      photos: photos
    }

    let finalPayload = [
      {
        category: json.category,
        family: json.family,
        productRegistry: json.registry === '' ? null : json.registry,
        data: payload
      }
    ]
    console.log('final dumb json: ', finalPayload)
    await PetStoreAdminService.addProduct(me.token, finalPayload)
  } catch (e) {
    error(e.status, e.message)
  }
}

export const actions = {upload}
