//src/components/loai/Loai.js
import '../assests/loai.css'
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

export const Loai = () => {
    const appData = useSelector((state) => state);
    console.log("appData in Loai:", appData);

    const [dataLoai, setDataLoai] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [loaiObj, setLoaiObj] = useState({});
    const apiUrl = "https://localhost:44325/api/loai";
    const getLoai = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setDataLoai(data);
            });
    }

    useEffect(() => {
        getLoai();

        // let myInterval = setInterval(() => { getLoai() }, 10000);

        // return () => clearInterval(myInterval);

    }, []);

    const getLoaiById = (id, item) => {
        setIsEdit(true);
        setLoaiObj(item);
    }

    const updateLoaiObj = (key, value) => {
        let newObj = loaiObj;
        newObj[key] = value;
        console.log(newObj);
        setLoaiObj(newObj);
    }

    return (
        <div>
            <h2>Quản lý Loại</h2>
            {dataLoai.length === 0 ? (
                <h3>No data</h3>
            ) : (
                dataLoai.map((item, index) => (
                    <div class="item-loai">
                        {item.tenLoai} - {item.maLoai}
                        <button onClick={() => getLoaiById(item.maLoai, item)} className="item-loai-edit">
                            Sửa</button>
                    </div>
                )
                )
            )}

            {isEdit && (
                <div>
                    <h4>SỬA THÔNG TIN</h4>
                    <form>
                        Mã loại: <input value={loaiObj.maLoai} readOnly /><br />
                    Tên loại: <input defaultValue={loaiObj.tenLoai} onChange={(e) => updateLoaiObj("tenLoai", e.target.value)} /><br />
                    Hình: <input defaultValue={loaiObj.hinh} onChange={(e) => updateLoaiObj("hinh", e.target.value)} /><br />
                    Mô tả: <textarea onChange={(e) => console.log(e)}>{loaiObj.moTa}</textarea><br />
                        <button>Cập nhật</button>
                    </form>
                </div>
            )}

        </div>
    );
}