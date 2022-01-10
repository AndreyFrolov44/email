import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

import { MAILININGS_ROUTE } from "../../utils/consts";

const Mailings = observer((props) => {
    return (
        <li className="mailing-item">
            <div className="mailing-item-content">
                <Link className="mailing-item-name" to={MAILININGS_ROUTE + props.m.id}>{props.m.title}</Link>
                <span className="cart-text">{props.m.list_name}</span>
                <span className="cart-text">{dateFormat(props.m.date, "dd.mm.yyyy")}</span>
            </div>
            <div className="mailing-item-content">
                <span className="cart-num">{props.m.sent}</span>
                <span className="cart-text">Отправлено</span>
            </div>
            <div className="mailing-item-content">
                <span className="cart-num">{props.m.delivery}</span>
                <span className="cart-text">Доставлено</span>
            </div>
            <div className="mailing-item-content">
                <span className="cart-num">{props.m.read}</span>
                <span className="cart-text">Прочитано</span>
            </div>
        </li>
    )
})

export default Mailings;