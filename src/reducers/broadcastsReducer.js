import { FETCH_BROADCASTS } from '../actions/broadcastsGetter'

export function broadcasts(state = [], action) {
  switch(action.type) {
    case FETCH_BROADCASTS: 
      return action.payload.data.broadcasts

    default:
      return state;
  }
}