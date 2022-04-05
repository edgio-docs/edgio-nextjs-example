import fetch from 'node-fetch'

const origin = 'https://layer0-docs-layer0-examples-api-default.layer0.link'
let apiUrl

if (typeof window !== 'undefined') {
  apiUrl = location.protocol + '//' + location.host + '/api'
} else {
  apiUrl = origin
}

export function getOptimizedImageUrl(path) {
  return `https://opt.moovweb.net?quality=30&height=250&width=250&img=${encodeURIComponent(
    apiUrl + path
  )}`
}

/**
 * Gets all categories
 *
 * @return {Array}
 */
export async function getCategories() {
  const ret = { categories: [] }

  const res = await fetch(`${apiUrl}/category`).catch((e) => ({
    error: e.message,
  }))

  ret.categories = await res.json()

  ret.categories.forEach((item) => {
    item.slug = item.href.split('/')[2]
  })

  return ret
}

/**
 * Gets a category by ID
 * @param {String} categoryId
 *
 * @return {Object}
 */
export async function getCategory(categoryName) {
  const ret = { products: [] }

  const res = await fetch(`${apiUrl}/category/${categoryName}`).catch(
    (e) => (ret.error = e.message)
  )

  ret.products = await res.json()
  ret.products.forEach((item) => {
    item.picture = getOptimizedImageUrl(item.picture)
    item.slug = item.href.split('/')[2]
  })

  return ret
}

/**
 * Gets a product by ID
 * @param {String} productId
 *
 * @return {Object}
 */
export async function getProductById(productId) {
  const ret = { product: {} }

  const res = await fetch(`${apiUrl}/product/${productId}`).catch((e) => (ret.error = e.message))

  ret.product = await res.json()
  ret.product.picture = getOptimizedImageUrl(ret.product.picture)

  return ret
}
