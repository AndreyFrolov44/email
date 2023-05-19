import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import { API_URL } from "../utils/consts";

export default class UserStore {
    isAuth = localStorage.getItem("token") ? true : false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            this.setAuth(true);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
        } catch (e) {
            return e.response?.data?.detail;
        }
    }

    async registration(username, email, password, password2) {
        try {
            const response = await AuthService.registration(username, email, password, password2);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            this.setAuth(true);
        } catch (e) {
            return e.response?.data?.detail;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');



            this.setAuth(false);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            console.log("Обновление access токена");
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            this.setAuth(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}