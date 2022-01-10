import React from "react";

const Tariff = () => {
    return (
        <ul className="rate-list">
            <li className="rate-item">
                <h3>Бесплатный</h3>
                <div className="rate-text">Ограниченное количество писем</div>
                <div className="rate-price">0 руб/мес</div>
                <span className="rate-details">2000 писем в месяц</span>
                <a href="#" className="rate-button">Подробнее</a>
            </li>
            <li className="rate-item">
                <h3>Основной</h3>
                <div className="rate-text">Выберите количество подписчиков</div>
                <select name="folowers" id="folowers">
                    <option value="До 1000">До 1000</option>
                    <option value="1000-1500">1000-1500</option>
                    <option value="1500-2500">1500-2500</option>
                    <option value="Больше 2500">Больше 2500</option>
                </select>
                <div className="rate-price">500 руб/мес</div>
                <span className="rate-details">Неограниченное количество писем</span>
                <a href="#" className="rate-button">Подробнее</a>
            </li>
            <li className="rate-item">
                <h3>Фиксированный</h3>
                <div className="rate-text">Введите количество писем</div>
                <input type="text" />
                <div className="rate-price">500 руб</div>
                <a href="#" className="rate-button">Подробнее</a>
            </li>
        </ul>
    )
}

export default Tariff;