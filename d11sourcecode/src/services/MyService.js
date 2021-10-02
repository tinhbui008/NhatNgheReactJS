// src/services/MyService.js
import axios from 'axios';
import { authenHeader } from './AuthenHeader';

const CATEGORY_API = "https://localhost:44325/api/loai/";
const getLoais = () => {
    return axios.get(CATEGORY_API, { headers: authenHeader() });
}
