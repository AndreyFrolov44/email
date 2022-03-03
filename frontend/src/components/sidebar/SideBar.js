import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Context } from "../..";
import { HOME_ROUTE, TEMPLATES_ROUTE, LOG_CONTACTS, MAILININGS_ROUTE, LOG_RATE, CREATE_TEMPLATES_ROUTE } from "../../utils/consts";

const SideBAr = observer((props) => {
    const { user } = useContext(Context)

    let navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        user.logout()
        navigate(HOME_ROUTE);
    }

    return (
        <section className={props.sideBarActive ? 'menu active' : 'menu'}>
            <div className="menu-logo">Логотип</div>
            <div className="menu-close">
                <div className={props.sideBarActive ? 'menu-burger active' : 'menu-burger'} onClick={() => props.setSideBarActive(!props.sideBarActive)}><span className="burger"></span></div>
            </div>
            <nav className="menu-nav">
                <ul className="menu-list">
                    <li className="menu-item">
                        <NavLink to={LOG_CONTACTS}>Контакты</NavLink>
                    </li>
                    <li className="menu-item"><NavLink to={CREATE_TEMPLATES_ROUTE}>Конструктор шаблонов</NavLink></li>
                    <li className="menu-item"><NavLink to={TEMPLATES_ROUTE}>Мои шаблоны</NavLink></li>
                    <li className="menu-item"><NavLink to={MAILININGS_ROUTE}>Рассылки</NavLink></li>
                    <li className="menu-item"><NavLink to={LOG_RATE}>Переключить тариф</NavLink></li>
                    <li className="menu-item"><button className="button" onClick={logout}>Выйти</button></li>
                </ul>
            </nav>
        </section>
    )
})

export default SideBAr;