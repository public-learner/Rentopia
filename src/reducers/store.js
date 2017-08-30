import { combineReducers } from 'redux';
import { getLandlordProperties, landlordTenants } from './landlordReducer';
import { userData, tenantData, messages, notifications, docs, properties} from './reducers'
import { selectedTenantMedia } from './tenantReducer';
import { tenantPaidRent } from './paymentReducer'

const rootReducer = combineReducers({
  selectedTenantMedia: selectedTenantMedia,
  tenantPaidRent: tenantPaidRent,
  getLandlordProperties,
  landlordTenants,
  user: userData,
  tenantData: tenantData,
  messages: messages,
  notifications: notifications,
  docs: docs,
  properties: properties,
  loggedIn: isLoggedIn
});

export default rootReducer;