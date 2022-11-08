export async function fetcher(url: RequestInfo | URL, options = {}) {
  let response
  if (!options) {
    response = await fetch(url)
  } else {
    response = await fetch(url, options)
  }
  const data = await response.json()
  return data
}
