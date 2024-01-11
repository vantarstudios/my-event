import { combineReducers } from '@reduxjs/toolkit';
import profileReducer from './states/profile';

const rootReducer = combineReducers({
    profile: profileReducer,
});

export default rootReducer;
