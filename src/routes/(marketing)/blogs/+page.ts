import { PetStoreBlogService } from 'lib/services'

export async function load({ params, url, parent }) {

  let latestBlogs = await PetStoreBlogService.fetchlatest()
  return {
    latestBlogs
  }
}
