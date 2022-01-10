import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Context } from '../..';
import { HOME_ROUTE, CONTACTS_ROUTE, RATE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts';

const Header = observer(() => {
    const [menuActive, setMenuActive] = useState(false)
    const { user } = useContext(Context)

    let navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        user.logout()
        navigate(HOME_ROUTE);
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-line">
                    <div className="header-logo">Логотип</div>
                    <div className={menuActive ? 'active header-burger' : 'header-burger'} onClick={() => setMenuActive(!menuActive)}><span className="burger"></span></div>
                    <div className={menuActive ? 'active header-menu' : 'header-menu'}>
                        <nav className="header-nav">
                            <ul>
                                <li><NavLink to={HOME_ROUTE}>Главная</NavLink></li>
                                <li><NavLink to={RATE_ROUTE}>Тарифы</NavLink></li>
                                <li><a href="#">Меню</a></li>
                                <li><NavLink to={CONTACTS_ROUTE}>Контакты</NavLink></li>
                            </ul>
                        </nav>
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
})

export default Header