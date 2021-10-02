import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, FormControl, InputLabel, Select, Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    myControl: {
        margin: '10px',
    }
}));

export const ContactForm = () => {
    const classes = useStyles();
    const [hoTen, setHoTen] = useState('Nhất Nghệ');
    const [email, setEmail] = useState('');
    const [dienThoai, setDienThoai] = useState('');
    const [gioiTinh, setGioiTinh] = useState(2);
    const [errors, setErrors] = useState([]);

    const checkEmailFormat = (email) => {
        return /^[a-z]+([.+-][a-z0-9]{2,})*@gmail.com$/.test(email);
    }

    const handleSubmit = () => {
        //check lỗi
        const contact_info = {
            name: hoTen,
            email: email,
            phone: dienThoai,
            gender: gioiTinh
        }
        console.log(contact_info);
        setErrors([]);//xóa lỗi

        const nameIsValid = hoTen !== "";
        const emailIsValid = email !== "";
        const phoneIsValid = dienThoai !== "";
        if (!nameIsValid) {
            errors.push("Chưa nhập tên");
        }
        if (!emailIsValid) {
            errors.push("Chưa nhập email");
            //setErrors([...errors, "Tên chưa nhập"]);
        }
        if (!checkEmailFormat(email)) {
            setErrors([...errors, "Không đúng định dạng mail"]);
        }
        if (!phoneIsValid) {
            errors.push("Chưa nhập số điện thoại");
        }
        if (errors.length == 0) {
            //gửi - gọi API
            localStorage.setItem(dienThoai, JSON.stringify(contact_info));
            alert("Thành công");
        }
    }

    return (
        <div>
            <h2>FORM CONTACT</h2>
            <form onSubmit={handleSubmit}>
                <TextField className={classes.myControl} label="Họ tên" value={hoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                    variant="outlined" />
                <TextField className={classes.myControl} label="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} variant="outlined" />
                <TextField className={classes.myControl} onChange={(e) => setDienThoai(e.target.value)} label="Điện thoại" value={dienThoai}
                    variant="outlined" />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Giới tính</InputLabel>
                    <Select native value={gioiTinh}
                        onChange={(e) => setGioiTinh(e.target.value)} >
                        <option value={0}>Nam</option>
                        <option value={1}>Nữ</option>
                        <option value={2}>Khác</option>
                    </Select>
                </FormControl>
                <Button color="primary" onClick={handleSubmit} variant="contained">Thêm</Button>
                {errors.length > 0 ?
                    errors.map((err, index) => (
                        <li key={index}> {err}</li>
                    ))
                    : null
                }
            </form>
        </div>
    )
}