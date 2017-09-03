import { GET_PROPERTY_TENANTS } from '../actions/getPropertyTenants'
import { SORT_TENANTS_BY_PROPS } from '../actions/sortTenantsByProp'

export function propertyTenants(state = [], action) {
  switch(action.type) {
    case GET_PROPERTY_TENANTS: 
      return action.payload

    default:
      return state;
  }
}

export function sortedTenantsByProp(state = {}, action) {
  switch(action.type) {
    case SORT_TENANTS_BY_PROPS: 
      return action.payload

    default:
      return state;
  }
}