import { PetStoreSearchService, ProductService } from '$lib/services'
import { GetColorName } from 'hex-color-to-color-name'

export const prerender = false

export async function load({ url, parent }) {
	const { store, storeId, origin, sid } = await parent()
	const currentPage = +url.searchParams.get('page') || 1
	const fl = {}
	const query = url.searchParams || []
	const searchData = url.searchParams.get('q')
	let sort = url.searchParams?.get('sort') || ''
  let price = url.searchParams?.get('price') || ''
  let colors = url.searchParams?.get('colors') || ''
  let genders = url.searchParams?.get('genders') || ''
  let breed = url.searchParams?.get('breed') || ''
  let age = url.searchParams?.get('age') || ''
  let collection = url.searchParams?.get('collections') || ''

  switch (sort) {
    case '-updatedAt':
      sort = 'created_on:desc'
      break

    case 'updatedAt':
      sort = 'updated_on:asc'
      break

    case '-price':
      sort = 'price:desc'
      break

    case 'price':
      sort = 'price:asc'
      break

    case 'name':
      sort = 'title:asc'
      break

    case '-name':
      sort = 'title:desc'
      break
  }

  let filter = ''

  if (price && price.length > 0) {
    const priceArr = price.split(',')
    filter += `product.general_info.price:[${priceArr[0]}..${priceArr[1]}] && `
    console.log('filter: ', filter)
  }

  if (colors && colors.length > 0) {
    let colorsArr = colors.split(',')
    colorsArr = colorsArr.map(color => GetColorName(color))
    console.log('colors: ', colorsArr)
    filter += `product.color:[${colorsArr}] && `
  }

  if (genders && genders.length > 0) {
    const gendersArr = genders.split(',')
    filter += `product.sex:[${gendersArr}] && `
  }

  if (breed && breed.length > 0) {
    const breedArr = breed.split(',')
    filter += `product.breed:[${breedArr}] && `
  }

  if (age && age.length > 0) {
    let ageArr = age.split(',')
    ageArr = ageArr.map(age => age.split(' ')[0])
    console.log('ageArr: ', ageArr)
    filter += `product.age_in_days:[${ageArr}] && `
  }

  if (collection && collection.length > 0) {
    const collectionArr = collection.split(',')
    filter += `product.general_info.collection:[${collectionArr}] && `
  }

  //Remove last extra <space>&&<space>
  filter = filter.slice(0, filter.length - 4)
  console.log('filter: ', filter)

	for (const [key, value] of query.entries()) {
		fl[key] = value
	}

	let products: any = {}

	try {
		products = await PetStoreSearchService.search({
      query: url.searchParams.get('q'),
      sort: sort,
      group: 'product.general_info.price,product.categoryPool.name,product.age_in_days,product.sex,product.breed,product.color,product.general_info.collection',
      filter: encodeURIComponent(filter)
    })
	} catch (e) {
		console.log(e)
	}

	return {
		products,
		query: query.toString(),
		searchData,
		sort,
		store,
		currentPage
	}
}
