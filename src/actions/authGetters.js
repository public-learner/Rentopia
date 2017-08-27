import axios from 'axios'

export const CHECK_USER = 'check_user_signin';

export function signinUser(credentials) {
  const request = axios.post(`${ROOT_URL}/signin`, {
      email: credentials.email,
      password: credentials.password
    })
  return {
    type: CHECK_USER,
    payload: request
  }
}