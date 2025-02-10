import { saasDomain, saasName, websiteName } from 'lib/config'

export const load = async ({ locals, url, fetch }) => {
	const currentPage = +url.searchParams.get('page') || 1
	const q = url.searchParams.get('q') || ''
	const { pathname, host } = url
	locals.currentPage = currentPage
	locals.q = q
	// Can not do it directly from here because it will not cached
	// const res2 = await fetch('/server/store')
	// const storeFromServer = await res2.json()
	// locals.store = storeFromServer.store
	// locals.megamenu = storeFromServer.megamenu
	// locals.menu = storeFromServer.menu
	// locals.popularSearches = storeFromServer.popularSearches
  let store = {
    websiteName,
    saasName,
    saasDomain,
    email: [
      {
        name: 'Customer Grievance',
        mail: 'grievance@paradisepethouse.com',
      },
      {
        name: 'Seller Enquiry',
        mail: 'seller@paradisepethouse.com',
      }
    ],
    phone: '9600552761',
    guaranteed_response_time: '2 Business Days',
    socialSharingButtons: {
      active: true,
      facebook: 'paradisepethouse',
      instagram: '@paradisepethouse.com',
    }
  }
	return { ...locals, pathname, host, q, currentPage, store }
}
