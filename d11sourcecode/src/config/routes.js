//define config cho từng component
// src/config/routes.js
import { Login } from '../components/Login';
import { NotFound } from '../components/PageNotFound';
import { Profile } from '../components/khachhang/Profile';
import { Cart } from '../components/Cart';
import { ThemHangHoa } from '../components/hanghoa/ThemHangHoa';
import { DanhSachHangHoa } from '../components/hanghoa/DanhSachHangHoa';
import { Loai } from '../components/loai/Loai';
import { ThongKeDoanhSo } from '../components/thongke/ThongKeDoanhSo';

import CryptoJS from 'crypto-js';

console.log("MD5(VT001)=", CryptoJS.MD5('VT001').toString());

export const routes = [
    {
        path: '/login',
        component: Login,
        isPrivate: false
    },
    {
        path: '/giohang',
        component: Cart,
        isPrivate: false
    },
    {
        path: '/hanghoa',
        component: DanhSachHangHoa,
        isPrivate: false
    },
    {
        path: '/admin/hanghoa/them',
        component: ThemHangHoa,
        isPrivate: true
    },
    {
        path: '/admin/loai',
        component: Loai,
        isPrivate: true
    },
    {
        path: '/profile',
        component: Profile,
        isPrivate: true
    },
    {
        path: '/*',
        component: NotFound,
        isPrivate: false
    },
];

// Định nghĩa danh sách components
const components = {
    thongke: {
        path: '/thongke',
        component: ThongKeDoanhSo,
        isPrivate: false
    },
    login: {
        path: '/login',
        component: Login,
        isPrivate: false
    },
    loai: {
        path: '/admin/loai',
        component: Loai,
        isPrivate: true
    },
    profile: {
        path: '/profile',
        component: Profile,
        isPrivate: true
    },
    hanghoa: {
        path: '/hanghoa',
        component: DanhSachHangHoa,
        isPrivate: false
    }
}


// Định nghĩa danh sách components theo role
export const rolesConfig = {
    Guest: {
        routes: [
            components.login,
            components.hanghoa,
            components.thongke
        ]
    },
    //VT001: //Khách hàng
    '854dd08f9e2b0f9fe6ca386947fd8354':
    {
        routes: [components.profile]
    },
    //VT002: //Quản trị
    '261eccddf92b090964a8fa2ef8247189':
    {
        routes: [components.profile, components.loai]
    }
};
