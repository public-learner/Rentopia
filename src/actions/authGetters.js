import axios from 'axios'

export const USER_LOGIN = 'user_login'
export const USER_SIGNUP = 'user_signup'

const ROOT_URL = 'http://localhost:8000'

export function signupUser(credentials) {
  const request = axios.post(`${ROOT_URL}/api/auth/signup`, {
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
  const request = axios.post(`${ROOT_URL}/api/auth/login`, {
      email: credentials.email,
      password: credentials.password
    })
  // **** request should have userData, tenant info, messages, docs, media
  return {
    type: USER_LOGIN,
    payload: request
  }
}