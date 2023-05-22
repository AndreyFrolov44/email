import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Context } from '../..';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false)
    const { user } = useContext(Context)

    let navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        user.logout()
        navigate(LOGIN_ROUTE);
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-line">
                    <div className={menuActive ? 'active header-burger' : 'header-burger'} onClick={() => setMenuActive(!menuActive)}><span className="burger"></span></div>
                    <div className={menuActive ? 'active header-menu' : 'header-menu'}>
                        <div className="buttons">
                            {!user.isAuth ? (
                                <>
                                    <NavLink to={LOGIN_ROUTE} className="button">Войти</NavLink>
                                    <NavLink to={REGISTER_ROUTE} className="button button-dark">Регистрация</NavLink>
                                </>
                            )
                                :
                                <button className="button" onClick={logout}>Выйти</button>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header