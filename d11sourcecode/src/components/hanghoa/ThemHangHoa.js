// src/components/hanghoa/ThemHangHoa.js
import axios from 'axios';
import { useState, useEffect } from "react"

export const ThemHangHoa = () => {
    const [dataLoai, setDataLoai] = useState([]);
    const [tenHh, setTenHh] = useState('');
    const [nhaCc, setNhaCc] = useState('NK');
    const [donGia, setDonGia] = useState(0);
    const [ngaySx, setNgaySx] = useState(new Date());
    const [maLoai, setMaLoai] = useState('');

    const [errMessage, setErrorMessage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [myFile, setMyFile] = useState({});
    const hangHoaEndpoint = "https://localhost:44325/api/HangHoa";
    const loaiEndpoint = "https://localhost:44325/api/loai";

    useEffect(() => {
        axios.get(loaiEndpoint)
            .then(response => {
                setDataLoai(response.data);
            })
            .catch(err => {
                console.log(`Lỗi load loại: ${err}`);
            });
    }, []);

    const handleCreateNewProduct = (e) => {
        setUploadMessage('');
        //1. Tạo object FormData
        const formData = new FormData();
        formData.append("myFile", myFile);
        formData.append("TenHh", tenHh);
        formData.append("MaNcc", nhaCc);
        formData.append("MaLoai", maLoai);
        formData.append("DonGia", donGia);
        formData.append("NgaySX", ngaySx);

        //2. call api
        axios.post(hangHoaEndpoint, formData)
            .then((response) => {
                console.log(response);
                setUploadMessage("Thêm mới hàng hóa thành công");
                //reset data
            })
            .catch((error) => {
                setUploadMessage(`Có lỗi: ${error}`)
            });
    }

    const checkFileExtension = (e) => {
        setErrorMessage('');
        //check file type
        const fileTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];

        let file = e.target.files;
        if (fileTypes.every(extension => file[0].type !== extension)) {
            setErrorMessage(`Không support loại file ${file[0].type} này.`);
        } else {
            setMyFile(file[0]);
        }
    }

    return (
        <div>
            <h2>THÊM HÀNG HÓA</h2>
            <table style={{ margin: '0 auto', textAlign: "justify" }}>
                <tr>
                    <td>Tên hàng hóa</td>
                    <td>
                        <input required onChange={e => setTenHh(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>Nhà cung cấp</td>
                    <td>
                        <input placeholder="NK/SS/AP/MO/SM" onChange={e => setNhaCc(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>Đơn giá</td>
                    <td>
                        <input type="number" onChange={e => setDonGia(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>Ngày sản xuất</td>
                    <td>
                        <input type="date" onChange={e => setNgaySx(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>Loại</td>
                    <td>
                        <select onChange={e => { setMaLoai(e.target.value) }}>
                            <option disabled>---None---</option>
                            {dataLoai.length > 0 &&
                                dataLoai.map((item) => {
                                    return (
                                        <option value={item.maLoai}>{item.tenLoai}</option>
                                    )
                                })
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Hình</td>
                    <td>
                        <input type="file" onChange={checkFileExtension} />
                        <span>{errMessage}</span>
                    </td>
                </tr>
            </table>
            <button onClick={handleCreateNewProduct}>Thêm mới</button>
            <div>{uploadMessage}</div>
        </div>
    );
}