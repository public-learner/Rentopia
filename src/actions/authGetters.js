import axios from 'axios'

export const USER_LOGIN = 'user_login'
export const USER_SIGNUP = 'user_signup'

export function signupUser(credentials) {
  const request = axios.post(`${ROOT_URL}/signup`, {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      isLandlord: credentials.isLandlord
    })

  return {
    type: USER_SIGNUP,
    payload: request
  }
}

export function loginUser(credentials) {
  const request = axios.post(`${ROOT_URL}/login`, {
      email: credentials.email,
      password: credentials.password
    })
  // request should have userId, rentDue, messages, docs, media
  return {
    type: USER_LOGIN,
    payload: request
  }
}