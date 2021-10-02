// src/components/UploadFile.js
import axios from 'axios';
import { useState } from "react"

export const UploadFile = () => {
    const [errMessage, setErrorMessage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [myFile, setMyFile] = useState({});
    const uploadFileEndpoint = "https://localhost:44325/api/HangHoa/upload";

    const handleUploadFile = (e) => {
        setUploadMessage('');
        //1. Tạo object FormData
        const formData = new FormData();
        formData.append("myFile", myFile);

        //2. call api
        axios.post(uploadFileEndpoint, formData)
            .then((response) => {
                console.log(response);
                setUploadMessage("Upload file thành công")
                setMyFile({});
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
            <h2>DEMO UPLOAD FILE</h2>
            Chọn file:
            <input type="file" onChange={checkFileExtension} />
            <span>{errMessage}</span>
            <button onClick={handleUploadFile}>Upload</button>
            <div>{uploadMessage}</div>
        </div>
    );
}