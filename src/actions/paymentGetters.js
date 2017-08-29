import axios from 'axios'

export const SEND_PAYMENT = 'send_payment'

const ROOT_URL = 'http://localhost:8000'

export function tenantPayment(payment) {
  const request = axios.post(`${ROOT_URL}/api/payments/payrent`, {
    nonce: payment.nonce
  })

  return {
    type: SEND_PAYMENT,
    payload: request
  }
}