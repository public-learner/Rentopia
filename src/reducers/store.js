import { combineReducers } from 'redux';
import { tenantRentDue, tenantMessages, tenantDocs } from './tenantReducer';

const rootReducer = combineReducers({
  tenantRentDue: tenantRentDue,
  tenantMessage: tenantMessages,
  tenantDocs: tenantDocs.
});

export default rootReducer;