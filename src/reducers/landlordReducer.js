import { USER_LOGIN } from '../actions/authGetters'
import { FETCH_LL_PROPERTIES, FETCH_LL_TENANTS, ADD_PROPERTY } 
  from '../actions/landlordDashboardGetters.js'

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
      return [...state, action.payload] || null
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
