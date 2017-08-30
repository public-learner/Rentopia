import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs, selectedTenantMedia } from './tenantReducer';
import { getLandlordProperties, landlordTenants } from './landlordReducer';
import { userId } from './authReducer'
import { tenantPaidRent } from './paymentReducer'

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessages: tenantMessages,
  tenantDocs: tenantDocs,
  selectedTenantMedia: selectedTenantMedia,
  userId: userId,
  tenantPaidRent: tenantPaidRent,
  getLandlordProperties,
  landlordTenants
});

export default rootReducer;
