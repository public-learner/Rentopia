import axios from 'axios'

export const CHECK_USER_SIGNIN = 'check_user_signin'
export const CHECK_USER_SIGNUP = 'check_user_signup'

export function signinUser(credentials) {
  const request = axios.post(`${ROOT_URL}/signin`, {
      email: credentials.email,
      password: credentials.password
    })
  return {
    type: CHECK_USER_SIGNIN,
    payload: request
  }
}

export function signupUser(credentials) {
  const request = axios.post(`${ROOT_URL}/signin`, {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: credentials.password,
      userType: credentials.userType
    })
  return {
    type: CHECK_USER_SIGNUP,
    payload: request
  }
}