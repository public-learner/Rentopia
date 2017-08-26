import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs, selectedTenantMedia } from './tenantReducer';

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessages: tenantMessages,
  tenantDocs: tenantDocs,
  selectedTenantMedia: selectedTenantMedia

});

export default rootReducer;