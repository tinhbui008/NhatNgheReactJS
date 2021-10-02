export const LikedReducer = (state = [], data) => {
    switch (data.type) {
        case 'LIKE':
            let index = findProductInLikedList(state, data.payload);
            if (index == -1) {
                state.push(data.payload);
            }
            return state;
        default:
            return state;
    }
}

const findProductInLikedList = (productList, productId) => {
    let index = -1;
    if (productList.length > 0) {
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].maHh === productId) {
                index = i;
                break;
            }
        }
    }
    return index;
}
