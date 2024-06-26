import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";


// this now only gets payments by customer

// TODO: add customer to URL
export function getPaymentTypes(customerId) {
  return fetchWithResponse(`paymenttypes?customer=${customerId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}
export function addPaymentType(paymentType) {
  return fetchWithResponse(`paymenttypes`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentType)
  })
}

export function deletePaymentType(id) {
  return fetchWithoutResponse(`paymenttypes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}
