// src/actions/index.js
import * as Types from '../constants/Types';

//Định nghĩa action cho Login/Logout
export const actionLogin = (userId, fullName, token) => {
    return {
        type: Types.UserService.LOGIN_SUCCESS,
        //payload: data truyền vào từ component
        payload: {
            "token": token,
            "userId": userId,
            "fullName": fullName
        }
    }
}

export const actionLogout = () => {
    return {
        type: Types.UserService.LOGOUT
    }
}

//Định nghĩa các Action - thông tin gửi đến reducer
export const actionAddToCart = (product, quantity = 1) => {
    return {
        type: Types.ADD_PRODUCT_TO_CART,
        product,
        quantity
    }
}

export const actionUpdateCart = (product, quantity = 1) => {
    return {
        type: Types.UPDATE_PRODUCT_IN_CART,
        product,
        quantity
    }
}

export const actionRemoveCart = (product) => {
    return {
        type: Types.REMOVE_PRODUCT_OUT_CART,
        product
    }
}

export const actionCleanCart = () => {
    return {
        type: Types.CLEAN_CART
    }
}
