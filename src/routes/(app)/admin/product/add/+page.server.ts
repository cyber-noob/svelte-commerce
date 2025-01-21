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

const upload = async ({ url, request, cookies, locals }) => {
  const data: FormData = await request.formData()
  console.log('form data: ', data)

  const tigrisBaseUri = 'https://fly.storage.tigris.dev/pethouse-puppy/'
  let photos= []

  let photosResponse = await PetStoreAdminService.addPhotos(data)
  photosResponse.files.forEach((file) => {
    photos.push({
      url: tigrisBaseUri + file
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
  await PetStoreAdminService.addProduct(finalPayload)
}

export const actions = {upload}
