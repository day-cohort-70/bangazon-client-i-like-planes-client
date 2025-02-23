import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getProducts(query=undefined) {
  const url = 'products'

  if (query) {
    url += `?${query}`
  }

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getCategories() {
  return fetchWithResponse('productcategories', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getCategoriesWithTopFiveProducts() {
  return fetchWithResponse('productcategories/recentproducts', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getProductById(id) {
  return fetchWithResponse(`products/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function addProductToOrder(id) {
  return fetchWithResponse(`profile/cart`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({product_id: id})
  })
}

export function removeProductFromOrder(id) {
  return fetchWithoutResponse(`cart/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function deleteProduct(id) {
  return fetchWithoutResponse(`products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function rateProduct(productId, rating) {
  return fetchWithResponse(`products/${productId}/rate-product`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rating)
  })
}

export function addProduct(product) {
  return fetchWithResponse(`products`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
}

export function editProduct(id, product) {
  return fetchWithoutResponse(`products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
}

export function recommendProduct(product_id, username) {
  return fetchWithResponse(`products/${product_id}/recommend`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
  })
}

export function likeProduct(productId) {
  return fetchWithoutResponse(`products/${productId}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
}

export function unLikeProduct(productId) {
  return fetchWithoutResponse(`products/${productId}/unlike`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
}
