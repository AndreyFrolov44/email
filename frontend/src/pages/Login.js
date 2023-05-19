import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { Context } from "..";
import { LOG_CONTACTS } from "../utils/consts";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authError, setError] = useState();

    const { user } = useContext(Context);
    let navigate = useNavigate();

    const logClick = (e) => {
        e.preventDefault();
        user.login(email, password).then((error) => {
            console.log(error)
            if (error) setError(error);
            else navigate(LOG_CONTACTS);
        });

    };


    return (
        <section className="login">
            <div className="container">
                <form className="login-form">
                    {authError &&
                        <p className="error">{authError}</p>
                    }
                    <label for="email">Введите почту</label>
                    <input id="email" value={email} type="text" placeholder="Почта" onChange={e => setEmail(e.target.value)} />
                    <label for="password">Введите пароль</label>
                    <input id="password" onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                    <button className="button" onClick={logClick}>Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;