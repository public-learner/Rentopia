import { FETCH_RENT, FETCH_MESSAGES, FETCH_DOCS, FETCH_SELECTED_MEDIA } 
	from '../actions/tenantDashboardGetters.js';

import { USER_LOGIN } from '../actions/authGetters'

export function tenantRentDue(state = null, action) {
	switch(action.type) {
		case FETCH_RENT: 
			return action.payload.data;
		case USER_LOGIN: 
			return action.payload.data.rentDue;

		default:
			return state;
	}
}
export function tenantMessages(state = null, action) {
	switch(action.type) {

		case FETCH_MESSAGES:
			return action.payload.data;
		case USER_LOGIN: 
			return action.payload.data.messages;

		default:
			return state;
	}
}

export function tenantDocs(state = null, action) {
	switch(action.type) {

		case FETCH_DOCS:
		  return action.payload.data;
		case USER_LOGIN: 
			return action.payload.data.docs;

		default:
			return state;
	}
}

export function selectedTenantMedia(state = null, action) {
	switch(action.type) {

		case FETCH_SELECTED_MEDIA:
		  return action.payload;
		case USER_LOGIN: 
			return action.payload.data.media;

		default:
			return state;
	}
}
