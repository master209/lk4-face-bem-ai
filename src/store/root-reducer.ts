import {combineReducers} from '@reduxjs/toolkit';
import {mainProcess} from './main-process';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainProcess.reducer,
});
