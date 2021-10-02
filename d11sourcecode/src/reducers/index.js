// src/reducers/index.js
import { combineReducers } from 'redux';
import { Cart } from './GioHangReducer';
import { loginReducer } from './AuthenReducer';
import { LikedReducer } from './LikedReducer';

export const appReducers = combineReducers({
    Cart,
    User: loginReducer,
    LikedReducer
});