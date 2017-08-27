import { CHECK_USER } from '../actions/authGetters'

export function userSignin(state = null, action) {
  switch(action.type) {
    case CHECK_USER: 
      return action.payload.userId;

    default:
      return state;
  }
}