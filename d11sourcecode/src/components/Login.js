//npm install --save reactstrap
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';
import { AuthenService } from '../services/AuthenService';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin } from '../actions/index';

export const Login = () => {
    const dispatch = useDispatch();
    const appData = useSelector((state) => state);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        AuthenService.login(username, password)
            .then(result => {
                console.log(result);
                if (result.success === true) {
                    alert("Đăng nhập thành công");
                    dispatch(actionLogin(username, username, result.data));
                } else {
                    alert("Đăng nhập thất bại");
                }
            })
            .catch(err => { console.log(err); });
    }
    return (
        <div>
            <h2>ĐĂNG NHẬP</h2>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input type="text" name="email" id="exampleEmail" placeholder="Mã người dùng" onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button color="danger" onClick={handleLogin}>
                    Đăng nhập
                </Button>
            </Form>
            <div>

            </div>
        </div>
    )
}