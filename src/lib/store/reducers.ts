import { combineReducers } from '@reduxjs/toolkit';
import isAuthenticatedReducer from './is-authenticated.state';

const rootReducer = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
});

export default rootReducer;
