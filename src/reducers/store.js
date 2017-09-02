import { combineReducers } from 'redux';
import { userData, tenantData, landlordData, messages, docs, isLoggedIn} from './reducers'
import { landlordProperties, landlordTenants } from './landlordReducer';
import { selectedTenantMedia } from './tenantReducer';
import { tenantPaidRent } from './paymentReducer'
import { broadcasts } from './broadcastsReducer'

const rootReducer = combineReducers({
  selectedTenantMedia,
  tenantPaidRent,
  landlordProperties,
  landlordTenants,
  user: userData,
  tenantData,
  landlordData,
  messages,
  docs,
  loggedIn: isLoggedIn,
  broadcasts
});

export default rootReducer;
