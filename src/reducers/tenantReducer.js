import { FETCH_SELECTED_MEDIA } from '../actions/tenantDashboardGetters.js';

export function selectedTenantMedia(state = null, action) {
	switch(action.type) {

		case FETCH_SELECTED_MEDIA:
		  return action.payload;

		default:
			return state;
	}
}
