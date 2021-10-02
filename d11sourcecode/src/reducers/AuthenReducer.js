// src/reducers/AuthenReducer.js
import * as Types from '../constants/Types';

const initStateValue = {
    isLoggedIn: false,
    token: null,
    userId: '',
    fullName: ''
}

export const loginReducer = (state = initStateValue, action) => {
    switch (action.type) {
        case Types.UserService.LOGIN_SUCCESS:
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.fullName = action.payload.fullName;
            return state;
        case Types.UserService.LOGOUT:
            state.isLoggedIn = false;
            state.token = null;
            state.userId = '';
            state.fullName = '';
            return state;
        default: return state;
    }
}