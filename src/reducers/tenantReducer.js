import { FETCH_RENT, FETCH_MESSAGES, FETCH_DOCS } from '../actions';

export tenantRentDue = (state = null, action) => {
	switch(action.type) {
		case FETCH_RENT: 
			return action.payload;

		default:
			return state;
	}
}
export tenantMessages = (state = null, action) => {
	switch(action.type) {

		case FETCH_MESSAGES:
			return action.payload;

		default:
			return state;
	}
}

export tenantDocs = (state = null, action) => {
	switch(action.type) {

		case FETCH_DOCS:
		  return action.payload;

		default:
			return state;
	}
}