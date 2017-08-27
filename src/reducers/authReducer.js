import { CHECK_USER_SIGNIN } from '../actions/authGetters'

export function userSignin(state = null, action) {
  switch(action.type) {
    case CHECK_USER_SIGNIN: 
      return action.payload.userId;

    default:
      return state;
  }
}