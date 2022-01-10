import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth', {email, password})
    }

    static async registration(username, email, password, password2){
        return $api.post('/users', {username, email, password, password2})
    }

    static async logout(){
        return $api.post('/logout')
    }

}