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
            localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(username, email, password, password2) {
        try {
            const response = await AuthService.registration(username, email, password, password2);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            // this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}