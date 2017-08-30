import { SET_PROFILE } from '../actions/setEditedProfileInfo'
import { USER_LOGIN, USER_SIGNUP } from '../actions/authGetters'
import { FETCH_RENT, FETCH_MESSAGES, FETCH_DOCS, FETCH_SELECTED_MEDIA } 
	from '../actions/tenantDashboardGetters.js';

export function userData(state = {}, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.userData
    case SET_PROFILE:
    	return Object.assign({}, state, action.payload.data)

    default:
      return state;
  }
}

export function tenantData(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.tenantData

    default:
      return state;
  }
}

export function notifications(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.notifications

    default:
      return state;
  }
}

export function messages(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.messages
    case FETCH_MESSAGES: 
      return action.payload.messages

    default:
      return state;
  }
}

export function docs(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.docs
    case FETCH_DOCS: 
      return action.payload.data.docs

    default:
      return state;
  }
}

export function properties(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.properties

    default:
      return state;
  }
}

