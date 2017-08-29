import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs, selectedTenantMedia } from './tenantReducer';
import { userId } from './authReducer'
import { tenantPaidRent } from './paymentReducer'

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessages: tenantMessages,
  tenantDocs: tenantDocs,
  selectedTenantMedia: selectedTenantMedia,
  userId: userId,
  tenantPaidRent: tenantPaidRent

});

export default rootReducer;