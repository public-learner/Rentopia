import axios from 'axios'

export const FETCH_BROADCASTS = 'fetch_broadcasts';

const ROOT_URL = 'http://localhost:8000'

export function getBroadcasts(propertyId) {
	//const request = axios.post(`${ROOT_URL}/api/props/broadcasts/${propertyId}`)
	console.log(propertyId)
	var data = {data: {broadcasts: ['Beware of zombies on property. They\'ll get ya.', 'No garbage allowed outside of a can from now on', 'stop being terrible tenants']}}
	return {
	  type: FETCH_BROADCASTS,
	  payload: data
	}
}