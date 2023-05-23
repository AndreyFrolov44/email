import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "..";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [authError, setError] = useState();

    const { user } = useContext(Context);

    let navigate = useNavigate();

    const regClick = (e) => {
        e.preventDefault();
        user.registration(username, email, password, password2)
            .then(error => {
                if (error) {
                    setError(authError);
                }
                else {
                    navigate(LOGIN_ROUTE)
                }
            })
    };


    return (
        <section className="login">
            <div className="container">
                <form className="login-form">
                    {authError &&
                        <p className="error">{authError}</p>
                    }
                    <label for="username">Введите имя пользователя</label>
                    <input id="username" value={username} type="text" onChange={e => setUsername(e.target.value)} placeholder="Имя пользователя" />
                    <label for="email">Введите почту</label>
                    <input id="email" value={email} type="text" onChange={e => setEmail(e.target.value)} placeholder="Почта" />
                    <label for="password">Введите пароль</label>
                    <input id="password" value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                    <label for="password2">Повторите пароль</label>
                    <input id="password2" value={password2} type="password" onChange={e => setPassword2(e.target.value)} placeholder="Повторите пароль" />

                    <button className="button" onClick={regClick}>Зарегистрироваться</button>
                </form>
            </div>
        </section>
    )
}

export default Register;