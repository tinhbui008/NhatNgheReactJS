// src/reducers/GioHangReducer.js
//Xử lý cập nhật state mới dựa vào action gửi qua + state cũ
import * as Types from '../constants/Types';
const cartData = localStorage.getItem("mycart");
const initCartValue = cartData ? JSON.parse(cartData) : [];

let index = -1;
export const Cart = (state = initCartValue, action) => {
    var { product, quantity } = action;
    switch (action.type) {
        case Types.ADD_PRODUCT_TO_CART:
            index = findProductInCart(state, product.maHh);
            if (index > -1) {
                state[index].quantity += quantity;
            } else {
                state.push({ product, quantity });
            }          
            console.log("State before leave reducer: ", state);
            localStorage.setItem("mycart", JSON.stringify(state));
            return state;
        case Types.UPDATE_PRODUCT_IN_CART:
            index = findProductInCart(state, product.maHh);
            if (index > -1) {
                state[index].quantity = quantity;
            }
            localStorage.setItem("mycart", JSON.stringify(state));
            return state;
        case Types.REMOVE_PRODUCT_OUT_CART:
            index = findProductInCart(state, product.maHh);
            if (index > -1) {
                state.splice(index, 1);
            }
            localStorage.setItem("mycart", JSON.stringify(state));
            return state;
        case Types.CLEAN_CART:
            localStorage.removeItem("mycart");
            return [];
        default: return state;
    }
    
}

const findProductInCart = (cart, productId) => {
    let index = -1;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.maHh === productId) {
                index = i;
                break;
            }
        }
    }
    return index;
}


//export default Cart;