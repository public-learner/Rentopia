import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:3302'

export const SET_PROFILE = 'set_profile'

export function setEditedProfileInfo(credentials = null) {
	// *** Uncomment this when real data is set up on the database ****
	  const request = axios.post(`${ROOT_URL}/editProfile`, {
      name: credentials.name,
      email: credentials.email,
      // password: credentials.password
    })
  return {
  	type: SET_PROFILE,
  	payload: request
  }

}