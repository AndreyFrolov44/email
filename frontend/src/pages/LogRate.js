import React from "react";
import { observer } from "mobx-react-lite";

const LogRate = observer((props) => {

    return (
        <section className={props.sideBarActive ? 'log-rate menu-active' : 'log-rate menu-closed'} id="section">
            <h1>Переключить тариф</h1>
            <p>На этой странице вы можете оплатить свой тариф</p>
            <ul className="log-rate-list">
                <li className="log-rate-item">
                    <div className="log-rate-item-content">
                        <h2>Основной</h2>
                    </div>
                    <div className="log-rate-item-content">
                        <span className="cart-text">Выберите количество подписчиков</span>
                        <input type="text" />
                    </div>
                    <div className="log-rate-item-content">
                        <span className="cart-text">Выберите количество месяцев</span>
                        <input type="text" />
                    </div>
                    <div className="log-rate-item-content">
                        <span className="cart-num">490</span>
                        <span className="cart-text">Рублей</span>
                    </div>
                    <div className="log-rate-item-content">
                        <a href="#" className="button">Оплатить</a>
                    </div>
                </li>
                <li className="log-rate-item">
                    <div className="log-rate-item-content">
                        <h2>Основной</h2>
                    </div>
                    <div className="log-rate-item-content">
                        <span className="cart-text">Выберите количество подписчиков</span>
                        <input type="text" />
                    </div>
                    <div className="log-rate-item-content">
                        <span className="cart-text">Выберите количество месяцев</span>
                        <input type="text" />
                    </div>
                    <div className="log-rate-item-content">
                        <span className="cart-num">490</span>
                        <span className="cart-text">Рублей</span>
                    </div>
                    <div className="log-rate-item-content">
                        <a href="#" className="button">Оплатить</a>
                    </div>
                </li>
            </ul>
        </section>
    )
})

export default LogRate;