import './App.css';
import { Demo, Hello } from './components/Demo';
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link, Switch
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { routes, rolesConfig } from './config/routes';
import { MyRoute } from './components/MyRoute';
import { uniqBy } from 'lodash';

function App() {
    const isLoggedIn = useSelector(state => state.User.isLoggedIn);
    const fullName = useSelector(state => state.User.fullName);
    const myCart = useSelector(state => state.Cart);
        
    let roles = ['Guest'];
    const userInfo = localStorage.getItem("user");
    if (isLoggedIn && userInfo !== undefined) {
        const myroles = JSON.parse(userInfo).roles;
        //thêm role người dùng
        roles = [...roles, ...myroles];
    }

    let allowedRoutes = roles.reduce((acc, role) => {
        return [...acc, ...rolesConfig[role].routes];
    }, []);
    allowedRoutes = uniqBy(allowedRoutes, 'path');

    const [hoTen, setHoTen] = useState('Nhất Nghệ');
    const handleChange = (value) => {
        console.log(value)
        setHoTen(value)
    }

    //Khai báo state chứa danh sách các việc cần làm
    const [items, setItems] = useState([
        { "text": "Đi học ReactJS", "done": false },
        { "text": "Xem phim", "done": true },
        { "text": "Nghe nhạc", "done": false }
    ]);
    const [value, setValue] = useState("");
    const handleAddItem = () => {
        //lấy giá trị của value thêm bào mảng Items
        let newValue = [{ "text": value, "done": false }, ...items]
        setItems(newValue);
    }
    const handleComplete = (index) => {
        console.log(index, items)
        let newValue = items;
        newValue[index].done = true;
        setItems(newValue);
        console.log("After", items)
    }
    return (
        <div className="App">
            <Router>
                { /* Menu */}
                <div>
                    <ul>
                        <li className="menu-item">
                            <Link to="/" style={{ textDecoration: 'none' }}>Trang chủ</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/admin/loai">QL Loại</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/hanghoa">Hàng hóa</Link>
                        </li>
                        {isLoggedIn ? (
                            <span>Xin chào {fullName}</span>
                        ) : (
                                <li className="menu-item">
                                    <Link to="/login">Đăng nhập</Link>
                                </li>
                            )}
                        <li className="menu-item">
                            <Link to="/giohang">
                                Giỏ hàng
                            </Link>
                            {myCart.length} sp.
                        </li>
                        <li className="menu-item">
                            <Link to="/thongke">
                                Thống kê
                            </Link>
                        </li>

                    </ul>
                </div>
                <hr />
                { /* Khai báo định tuyến*/}
                <div style={{ minHeight: 500, padding: 5 }}>
                    <Switch>
                        {allowedRoutes.map((item) => (
                            <MyRoute
                                key={item.path}
                                path={item.path}
                                component={item.component}
                                isPrivate={item.isPrivate}
                            />
                        ))}
                    </Switch>
                </div>
            </Router>


            <hr />
            <Demo name={hoTen} />
            <Hello name={hoTen} />
        </div>
    );
}

export default App;
