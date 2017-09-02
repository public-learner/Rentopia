import { FETCH_SELECTED_MEDIA } from '../actions/tenantDashboardGetters.js';
import { CURRENT_CONVO } from '../actions/sortMessages'
import { USER_LOGOUT } from '../actions/authGetters'

export function selectedTenantMedia(state = null, action) {
	switch(action.type) {

		case FETCH_SELECTED_MEDIA:
		  return action.payload;

		default:
			return state;
	}
}

export function setCurrentConvo(state = [], action) {
	switch(action.type) {
	  case CURRENT_CONVO:
	    return action.payload.convo

    case USER_LOGOUT: 
      return []

	  default:
	  	return state;
	}
}

export function messageRecipient(state = null, action) {
	switch(action.type) {
	  case CURRENT_CONVO:
	    return action.payload.id

	  default:
	  	return state;
	}
}
