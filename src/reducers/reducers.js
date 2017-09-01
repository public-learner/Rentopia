import { SET_PROFILE } from '../actions/setEditedProfileInfo'
import { USER_LOGIN, TENANT_LOGIN, LL_LOGIN } from '../actions/authGetters'
import { FETCH_RENT, FETCH_MESSAGES, FETCH_DOCS, FETCH_SELECTED_MEDIA } 
	from '../actions/tenantDashboardGetters.js';

export function userData(state = {}, action) {
  switch(action.type) {
    case USER_LOGIN: 
    console.log('login request is ', action.payload)
      return action.payload.data.user
    case SET_PROFILE:
    	return Object.assign({}, state, action.payload.data)

    default:
      return state;
  }
}

export function isLoggedIn(state = {}, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return true

    default:
      return false;
  }
}

export function tenantData(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      if (action.payload.data.tenant) {
        return action.payload.data.tenant
      } else {
        return state
      }

    default:
      return state;
  }
}

export function landlordData(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      if (action.payload.data.landlord) {
        return action.payload.data.landlord
      } else {
        return state
      }

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

export function docs(state = [], action) {
  switch(action.type) {
    case USER_LOGIN: 
      if (action.payload.data.docs) {
        return action.payload.data.docs
      } else {
        return state
      }
    case FETCH_DOCS: 
      return action.payload.data.docs

    default:
      return state;
  }
}
