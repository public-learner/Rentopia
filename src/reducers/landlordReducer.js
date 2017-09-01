
import { USER_LOGIN } from '../actions/authGetters'
import { FETCH_LL_PROPERTIES, FETCH_LL_TENANTS, ADD_PROPERTY } from '../actions/landlordDashboardGetters'

// const properties = [
//   {property_id: 1, property_name: "RnM", address: "123 Fake Street", city: "Atlantis", state_abbrv: "DNR"},
//   {property_id: 2, property_name: "Fleabag Motel", address: "456 Fake Street", city: "Atlantis", state_abbrv: "DNR"},
//   {property_id: 3, property_name: "742 Evergreen Terrace", address: "742 Evergreen Terrace", city: "Springfield", state_abbrv: "MA"},
//   {property_id: 4, property_name: "Retirement Home", address: "789 Fake Street", city: "Springfield", state_abbrv: "MA"},
//   {property_id: 5, property_name: "Winterfell", address: "0 Castle Lane", city: "Westeros", state_abbrv: "GoT"}
// ]

const tenants = [
  {name: "Beth Smith", property: "RnM", rent: 600, due:"09/01/2017", message: "false"},
  {name: "Rick Sanchez", property: "RnM", rent: 0, due:"09/01/2017", message: "false"},
  {name: "Morty Smith", property: "RnM", rent: 200, due:"09/01/2017", message: "false"},
  {name: "Summer Smith", property: "RnM", rent: 200, due:"09/01/2017", message: "false"},
  {name: "Jerry Smith", property: "Fleabag Motel", rent: 200, due:"09/01/2017", message: "false"},
  {name: "Snuffles", property: "RnM", rent: 100, due:"09/01/2017", message: "false"},
  {name: "Homer Simpson", property: "742 Evergreen Terrace", rent: 500, due:"09/01/2017", message: "false"},
  {name: "Marge Simpson", property: "742 Evergreen Terrace", rent: 500, due:"09/01/2017", message: "true"},
  {name: "Bart Simpson", property: "742 Evergreen Terrace", rent: 130, due:"09/01/2017", message: "false"},
  {name: "Lisa Simpson", property: "742 Evergreen Terrace", rent: 100, due:"09/01/2017", message: "false"},
  {name: "Abe Simpson", property: "Retirement Home", rent: 1500, due:"09/01/2017", message: "false"},
  {name: "Snowball III", property: "742 Evergreen Terrace", rent: 30, due:"09/01/2017", message: "false"},
  {name: "Santa's Little Helper", property: "742 Evergreen Terrace", rent: 60, due:"09/01/2017", message: "false"},
  {name: "Sansa Stark", property: "Winterfell", rent: 6000, due:"09/01/2017", message: "false"},
  {name: "Aria Stark", property: "Winterfell", rent: 6000, due:"09/01/2017", message: "false"}
];

export function landlordProperties(state = null, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return action.payload.data.properties || null
    case ADD_PROPERTY:
      return [...state, action.payload.data] || null
    default:
      return state
  }
}

export function landlordTenants(state = tenants, action) {
  switch(action.type) {
    case FETCH_LL_TENANTS:
      return action.payload.data

    default:
      return state
  }
}
