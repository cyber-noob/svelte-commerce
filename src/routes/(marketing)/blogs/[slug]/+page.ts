import { PetStoreBlogService } from "lib/services"

export async function load({ params, url, parent }) {
  const { slug } = params

  let blog = await PetStoreBlogService.fetchblog(slug)
  return {
    blog
  }
}
