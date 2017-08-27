import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs, selectedTenantMedia } from './tenantReducer';
import { userSignin } from './authReducer'

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessages: tenantMessages,
  tenantDocs: tenantDocs,
  selectedTenantMedia: selectedTenantMedia
  userSignin: userSignin

});

export default rootReducer;