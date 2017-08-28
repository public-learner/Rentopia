import axios from 'axios'

export const USER_LOGIN = 'user_login'
export const USER_SIGNUP = 'user_signup'

export function signupUser(credentials) {
  const request = axios.post(`${ROOT_URL}/signup`, {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: credentials.password,
      userType: credentials.userType
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