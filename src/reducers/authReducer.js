import { CHECK_USER_SIGNIN, CHECK_USER_SIGNUP } from '../actions/authGetters'

export function userSignin(state = null, action) {
  switch(action.type) {
    case CHECK_USER_SIGNIN: 
      return action.payload.userId

    default:
      return state;
  }
}

export function userSignup(state = null, action) {
  switch(action.type) {
    case CHECK_USER_SIGNUP: 
      return action.payload.userId

    default:
      return state;
  }
}