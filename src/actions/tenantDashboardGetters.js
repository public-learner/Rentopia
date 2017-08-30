import axios from 'axios';

export const FETCH_RENT = 'fetch_rent_total_due';
export const FETCH_MESSAGES = 'fetch_messages_for_tenant_user';
export const FETCH_DOCS = 'fetch_docs_for_tenant_user';
export const FETCH_SELECTED_MEDIA = 'fetch_selected_media';

const ROOT_URL = 'http://127.0.0.1:8000' // get user's rent url

export function getRentDue() {
	const request = axios.get(`${ROOT_URL}/rent`) //{params: {id: id}}
	// axios is a async helper that was imported
	return {
		type: FETCH_RENT,
		payload: request // redux-promise middleware will resolve this 
		// request for us because the redux-promise recognizes that it 
		// is a promise so it does it automatically
	}
}

export function getMessages() {
	const request = axios.get(`${ROOT_URL}/messages`)

	return {
		type: FETCH_MESSAGES,
		payload: request 
	}
}

export function getDocs() {
	const request = axios.get(`${ROOT_URL}/docs`)

	return {
		type: FETCH_DOCS,
		payload: request
	}
}

export function selectedMedia(media) {

	return {
		type: FETCH_SELECTED_MEDIA,
		payload: media
	}
}
