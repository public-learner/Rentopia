import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs, selectedTenantMedia } from './tenantReducer';
import { userSignin, userSignup } from './authReducer'

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessages: tenantMessages,
  tenantDocs: tenantDocs,
  selectedTenantMedia: selectedTenantMedia,
  userSignin: userSignin,
  userSignup: userSignup

});

export default rootReducer;