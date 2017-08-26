import axios from 'axios';

export const FETCH_RENT = 'fetch_rent_total_due';
export const FETCH_MESSAGES = 'fetch_messages_for_tenant_user';
export const FETCH_DOCS = 'fetch_docs_for_tenant_user';

const ROOT_URL = 'http://127.0.0.1:3302/' // get user's rent url

export getRentDue = (id) => {
	const request = axios.get(`${ROOT_URL}/rent`, {params: {id: id}})
	// axios is a async helper that was imported

	return {
		type: FETCH_RENT,
		payload: request // redux-promise middleware will resolve this 
		// request for us because the redux-promise recognizes that it 
		// is a promise so it does it automatically
	}
}

export getMessages = (id) => {
	const request = axios.get(`${ROOT_URL}/messages`, {params: {id: id}})

	return {
		type: FETCH_MESSAGES,
		payload: request 
	}
}

export getDocs = (id) => {
	const request = axios.get(`${ROOT_URL}/docs`, {params: {id: id}})

	return {
		type: FETCH_DOCS,
		payload: request
	}
}