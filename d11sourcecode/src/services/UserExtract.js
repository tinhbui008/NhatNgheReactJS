// src/services/UserExtract.js

//import { useSelector } from 'react-redux';

const userInfoData = localStorage.getItem("user");
const userInfo = userInfoData !== undefined ? JSON.parse(userInfoData) : null;
//export const isLoggedIn = useSelector((state) => state.User.isLoggedIn);

export const UserInfo = {    
    userName: userInfo !== null ? userInfo.username : '',
    hoTen: userInfo !== null ? userInfo.hoTen : '',
    token: userInfo !== null ? userInfo.token : '',
    roles: userInfo !== null ? userInfo.roles : '',
}

