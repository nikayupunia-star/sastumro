import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { modules } from './registry';

const rootReducer = combineReducers(Object.assign({}, ...modules.map((m) => m.reducers)));

export const store = configureStore({ reducer: rootReducer });
