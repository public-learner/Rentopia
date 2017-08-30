import { SEND_PAYMENT } from '../actions/paymentGetters'

export function tenantPaidRent(state = null, action) {
  switch(action.type) {
    case SEND_PAYMENT: 
      return action.payload.data;

    default:
      return state;
  }
}