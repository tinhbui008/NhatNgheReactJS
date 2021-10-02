import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { actionRemoveCart } from '../actions/index';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authenHeader } from '../services/AuthenHeader';
import { actionCleanCart } from '../actions/index';
import { useHistory } from 'react-router-dom';

export const Cart = () => {
    const history = useHistory();
    let dispatch = useDispatch();
    const myCartData = useSelector((state) => state.Cart);
    const [myCart, setMyCart] = useState(myCartData);
    const isUserLogged = useSelector((state) => state.User.isLoggedIn);
    const maKhachHang = useSelector((state) => state.User.userId);

    const [nguoiNhan, setNguoiNhan] = useState('');
    const [diaChiGiao, setDiaChiGiao] = useState('');

    const handleOrderCart = () => {
        let dataSend = {
            "maKh": maKhachHang,
            "nguoiNhan": nguoiNhan.trim(),
            "diaChiGiao": diaChiGiao.trim(),
            "hangHoa": []
        }
        myCart.map((item) => {
            dataSend.hangHoa.push({
                "maHH": item.product.maHh,
                "soLuong": item.quantity
            });
        });
        axios.post("https://localhost:44325/api/DonHang", dataSend, { headers: authenHeader() })
            .then((res) => {
                console.log(res);
                if (res.data.success === true) {
                    alert("Đặt hàng thành công");
                    //reset giỏ hàng
                    dispatch(actionCleanCart());
                    history.push("/admin/hanghoa/danhsach");
                    //console.log(res.data.data);
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch((err) => { });
    }

    const handleRemoveCart = (item) => {
        dispatch(actionRemoveCart(item));
    }

    return (
        <div>
            <h2>GIỎ HÀNG</h2>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ margin: '0 auto' }}>
                <tr>
                    <th>Mã</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th><th></th>
                </tr>
                {myCart !== undefined && myCart.map((item) => {
                    const total = item.product.giaBan * item.quantity;
                    return (
                        <tr>
                            <td>{item.product.maHh}</td>
                            <td>{item.product.tenHh}</td>
                            <td>{item.product.giaBan}</td>
                            <td>{item.quantity}</td>
                            <td>{total}</td>
                            <td>
                                <Button color="danger"
                                    onClick={() => handleRemoveCart(item.product)}                                >Xóa!</Button></td>
                        </tr>
                    )
                })
                }
            </table>
            {myCart !== undefined && myCart.length > 0 && (
                <div>
                    {isUserLogged ? (
                        <div>
                            <h2>Thông tin đặt hàng</h2>
                    Người nhận:
                            <input onChange={(e) => setNguoiNhan(e.target.value) } />
                            <br />
                    Địa chỉ giao:
                            <input onChange={(e) => setDiaChiGiao(e.target.value)} />
                            <br />
                            <button onClick={handleOrderCart}>Đặt hàng</button>
                        </div>
                    ) : (
                            <h4>Vui lòng đăng nhập để đặt hàng!</h4>
                        )}

                </div>
            )}
        </div>
    );
}