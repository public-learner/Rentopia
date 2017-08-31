import axios from 'axios'

export const USER_LOGIN = 'user_login'
export const LL_LOGIN = 'landlord_login'
export const TENANT_LOGIN = 'tenant_login'

const ROOT_URL = 'http://localhost:8000'

export function signupUser(credentials, cb) {

  axios.post(`${ROOT_URL}/api/auth/signup`, {
    user_name: credentials.name,
    email: credentials.email,
    password: credentials.password,
    isLandlord: credentials.isLandlord
  })
  .catch((err) => {
    console.log('error signing up', err)
    cb(false)
  })
  .then((response) => {
    var data = {
    email: credentials.email,
    password: credentials.password
  }
    cb(true, data)
  })

}

// export function loginUser(credentials) {
//   console.log(credentials)
//   axios.post(`${ROOT_URL}/api/auth/signin`, {
//       email: credentials.email,
//       password: credentials.password
//   })
//   .then((response) => {
//     console.log(response)
//     if (response.data.user.is_landlord) {
//       return {
//         type: LL_LOGIN,
//         payload: response
//       }
//     } else {
//       return {
//         type: TENANT_LOGIN,
//         payload: response
//       }
//     }
//   })
//   .catch((err) => {
//     console.log('error siging in', err)
//   })

export function loginUser(credentials) {
  const request = axios.post(`${ROOT_URL}/api/auth/signin`, {
      email: credentials.email,
      password: credentials.password
  })

  return {
    type: USER_LOGIN,
    payload: request
  }

  // **** request should have userData, tenant info, messages, docs, media
}