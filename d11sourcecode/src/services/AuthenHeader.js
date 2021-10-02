// src/services/AuthenHeader.js

export const authenHeader = () => {
    const userToken = localStorage.getItem("user");
    const tokenData = userToken !== undefined ? JSON.parse(userToken).token : null;
    if (tokenData) {
        return { Authorization: 'Bearer ' + tokenData }
    } else {
        return {}
    }
}