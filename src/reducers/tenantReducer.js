import { FETCH_RENT, FETCH_MESSAGES, FETCH_DOCS } from '../actions/tenantDashboardGetters.js';

export function tenantRentDue(state = null, action) {
	switch(action.type) {
		case FETCH_RENT: 
			return action.payload;

		default:
			return state;
	}
}
export function tenantMessages(state = null, action) {
	switch(action.type) {

		case FETCH_MESSAGES:
			return action.payload;

		default:
			return state;
	}
}

export function tenantDocs(state = null, action) {
	switch(action.type) {

		case FETCH_DOCS:
		  return action.payload;

		default:
			return state;
	}
}

export function selectedTenantMessage(state = null, action) {
	switch(action.type) {

		case FETCH_DOCS:
		  return action.payload;

		default:
			return state;
	}
}

export function selectedTenantDoc(state = null, action) {
	switch(action.type) {

		case FETCH_DOCS:
		  return action.payload;

		default:
			return state;
	}
}


