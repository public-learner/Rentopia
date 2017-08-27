import { FETCH_RENT, FETCH_MESSAGES, FETCH_DOCS, FETCH_SELECTED_MEDIA } 
	from '../actions/tenantDashboardGetters.js';

export function tenantRentDue(state = null, action) {
	switch(action.type) {
		case FETCH_RENT: 
			return action.payload.data;

		default:
			return state;
	}
}
export function tenantMessages(state = null, action) {
	switch(action.type) {

		case FETCH_MESSAGES:
			return action.payload.data;

		default:
			return state;
	}
}

export function tenantDocs(state = null, action) {
	switch(action.type) {

		case FETCH_DOCS:
		  return action.payload.data;

		default:
			return state;
	}
}

export function selectedTenantMedia(state = null, action) {
	switch(action.type) {

		case FETCH_SELECTED_MEDIA:
		  return action.payload;

		default:
			return state;
	}
}



