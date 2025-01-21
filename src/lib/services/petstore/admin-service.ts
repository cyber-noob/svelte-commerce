import { getAPI, post } from 'lib/utils'
import { PUBLIC_PETSTORE_MONOLITH } from '$env/static/public'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'
import axios from 'axios'

export const fetchProductCollections = async () => {
  try {
    const res =  await getAPI('admin/product/category', PUBLIC_PETSTORE_MONOLITH, {})

    console.log('admin-service product collections: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    goto(`/auth/login?ref=${window.location?.pathname}`)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchProductFamilies = async () => {
  try {
    const res =  await getAPI('admin/product/family', PUBLIC_PETSTORE_MONOLITH, {})

    console.log('admin-service product families: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    goto(`/auth/login?ref=${window.location?.pathname}`)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchProductRegistries = async (collection:string) => {
  try {
    const res =  await getAPI('admin/product/registry?collection=' + collection, PUBLIC_PETSTORE_MONOLITH, {})

    console.log('admin-service product registry: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    goto(`/auth/login?ref=${window.location?.pathname}`)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const fetchProductContract = async (collection:string, family:string, registry:string) => {
  try {
    const res =  await getAPI('admin/product/contract?collection=' + collection + '&family=' + family + '&registry=' + registry, PUBLIC_PETSTORE_MONOLITH)

    console.log('admin-service product contract: \n', res)
    return res

  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const addProduct = async (body: {}) => {
  try {
    let res: any = {}

    console.log('body: ', body)
    res = await post('admin/addProduct', body, PUBLIC_PETSTORE_MONOLITH)

    console.log('admin-service add to product: \n', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}

export const addPhotos = async (file: FormData) => {
  try {
    let res: {} = {}

    console.log('body: ', file)

    // const formData = new FormData()
    // formData.append('file', file)
    //
    // console.log('form: ', formData)

    await axios({
      method: "post",
      url: PUBLIC_PETSTORE_MONOLITH + '/api/admin/tigris',
      data: file,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        res = response.data
      })


    // await fetch(PUBLIC_PETSTORE_MONOLITH + '/api/admin/tigris', {
    //   method: 'POST',
    //   body: file,
    // })
    //   .then(r => r.json())
    //   .then(data => {
    //     res = data
    //     console.log(data)
    //   })
    // res = await post('admin/tigris', {files: [body]}, PUBLIC_PETSTORE_MONOLITH)

    console.log('admin-service add to photos: \n', res)

    return res
  } catch (e) {
    console.log('error: ', e)
    error(e.status, e.data?.message || e.message || e)
  }
}
