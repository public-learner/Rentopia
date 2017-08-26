import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs, selectedTenantMessage, selectedTenantDoc } from './tenantReducer';

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessages: tenantMessages,
  tenantDocs: tenantDocs,
  selectedTenantMessage: selectedTenantMessage,
  selectedTenantDoc: selectedTenantDoc

});

export default rootReducer;