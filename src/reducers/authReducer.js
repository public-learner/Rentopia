import { USER_LOGIN, USER_SIGNUP } from '../actions/authGetters'

export function userId(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.userId
    case USER_SIGNUP: 
      return action.payload.userId

    default:
      return state;
  }
}