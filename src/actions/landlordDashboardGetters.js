import axios from 'axios';

export const FETCH_LL_PROPERTIES = 'fetch_landlord_properties'
export const FETCH_LL_TENANTS = 'fetch_landlord_tenants'
export const ADD_PROPERTY = 'add_landlord_property'

const ROOT_URL = 'http://localhost:8000'

export function getTenants() {
  const request = axios.get(`${ROOT_URL}/api/tenants`) //{params: {id: id}}
  // axios is a async helper that was imported
  return {
    type: FETCH_LL_TENANTS,
    payload: request // redux-promise middleware will resolve this 
    // request for us because the redux-promise recognizes that it 
    // is a promise so it does it automatically
  }
}

export function getProperties() {
  const request = axios.get(`${ROOT_URL}/api/props`)

  return {
    type: FETCH_LL_PROPERTIES,
    payload: request 
  }
}

export function addProperty(propDetails, cb) {
  const createdProp = axios.post(`${ROOT_URL}/api/props/`, {
    landlord_id: propDetails.landlord_id,
    property_name: propDetails.property_name,
    address: propDetails.address,
    city: propDetails.city,
    state_abbrv: propDetails.state_abbrv
  })

  return {
    type: ADD_PROPERTY,
    payload: createdProp
  }

}
