import { combineReducers } from 'redux';
import { TenantRentDue, TenantMessages, TenantDocs, SelectedTenantMessage, SelectedTenantDoc } from './tenantReducer';

const rootReducer = combineReducers({
  tenantRentDue: TenantRentDue,
  tenantMessages: TenantMessages,
  tenantDocs: TenantDocs,
  selectedTenantMessage: SelectedTenantMessage,
  selectedTenantDoc: SelectedTenantDoc

});

export default rootReducer;