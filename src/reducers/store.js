import { combineReducers } from 'redux';
import { getLandlordProperties, landlordTenants } from './landlordReducer';
import { userData, tenantData, landlordData, messages, notifications, docs, properties, isLoggedIn} from './reducers'
import { selectedTenantMedia } from './tenantReducer';
import { tenantPaidRent } from './paymentReducer'
import { broadcasts } from './broadcastsReducer'

const rootReducer = combineReducers({
  selectedTenantMedia: selectedTenantMedia,
  tenantPaidRent: tenantPaidRent,
  getLandlordProperties,
  landlordTenants,
  user: userData,
  tenantData: tenantData,
  landlordData: landlordData,
  messages: messages,
  notifications: notifications,
  docs: docs,
  properties: properties,
  loggedIn: isLoggedIn,
  broadcasts: broadcasts
});

export default rootReducer;