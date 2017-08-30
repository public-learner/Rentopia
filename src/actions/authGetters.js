import axios from 'axios'

export const USER_LOGIN = 'user_login'

const ROOT_URL = 'http://localhost:8000'

export function signupUser(credentials) {
  axios.post(`${ROOT_URL}/api/auth/signup`, {
    email: credentials.email,
    password: credentials.password,
    isLandlord: credentials.isLandlord
  })
  .then((response) => {
    loginUser({
      email: credentials.email,
      password: credentials.password,
    })
  })
  .catch((err) => {
    console.log('error signing up', err)
  })

}

export function loginUser(credentials) {
  const request = axios.post(`${ROOT_URL}/api/auth/signin`, {
      email: credentials.email,
      password: credentials.password
    })
  // **** request should have userData, tenant info, messages, docs, media
  return {
    type: USER_LOGIN,
    payload: request
  }
}