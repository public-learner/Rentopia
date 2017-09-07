import { SEND_PAYMENT, ADD_BILL } from '../actions/paymentGetters'
import { USER_LOGIN } from '../actions/authGetters'

export function tenantPaidRent(state = false, action) {
  switch(action.type) {
    case SEND_PAYMENT: 
      return true

    default:
      return state;
  }
}

export function receivedTransactions(state=[], action) {
  switch(action.type) {
    case USER_LOGIN:
      if (action.payload.data.transactions) {
        return action.payload.data.transactions.receivedPayments
      } else {
        return state
      }
    default:
      return state
  }
}

export function sentTransactions(state=[], action) {
  switch(action.type) {
    case USER_LOGIN:
      if (action.payload.data.transactions) {
        return action.payload.data.transactions.sentPayments
      } else {
        return state
      }
    case SEND_PAYMENT: 
      if (action.payload.data) {
        return [...state, action.payload.data]
      }
    case ADD_BILL: 
      if (action.payload.data) {
        return [...state].concat(action.payload.data)
      }

    default:
      return state
  }
}