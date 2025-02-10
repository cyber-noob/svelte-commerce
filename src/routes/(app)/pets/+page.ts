export async function load({ params, parent, url }) {
  let { store, origin } = await parent()

  console.log('/pets store: ', store)
  return {
    store,
    origin,
  }
}
