import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { Context } from "..";
import Tab from "../components/tab/Tab";

import sent from '../assets/img/send.svg';
import delivery from '../assets/img/mail.svg';
import read from '../assets/img/read.svg';
import ContactsMailingTable from "../components/table/ContactsMailingTable";

const LogMailingsId = observer((props) => {
    const params = useParams();

    const [mailing, setMailing] = useState({});

    const { mailings } = useContext(Context)

    useEffect(() => {
        mailings.InfoMailings(params.id)
            .then(() => {
                setMailing(mailings.mailingsInfo)
            })
    }, [null])

    return (
        <section className={props.sideBarActive ? 'mailing-details menu-active' : 'mailing-details menu-closed'} id="section">
            <h1>{mailing.title}</h1>
            <Tab>
                <div name={'statistics'} nameRu={'Статистика'}>
                    <ul className="mailing-details-list">
                        <li className="mailing-details-item">
                            <div className="mailing-details-img"><img src={sent} alt="Отправлено" /></div>
                            <div className="mailing-details-item-text">
                                <span className="cart-num">{mailing.sent}</span>
                                <span className="cart-text">Отправлено</span>
                            </div>
                        </li>
                        <li className="mailing-details-item">
                            <div className="mailing-details-img"><img src={delivery} alt="Доставлено" /></div>
                            <div className="mailing-details-item-text">
                                <span className="cart-num">{mailing.delivery}</span>
                                <span className="cart-text">Доставлено</span>
                            </div>
                        </li>
                        <li className="mailing-details-item">
                            <div className="mailing-details-img"><img src={read} alt="Прочитано" /></div>
                            <div className="mailing-details-item-text">
                                <span className="cart-num">{mailing.read}/{mailing.delivery}</span>
                                <span className="cart-text">Прочитано</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div name={'address'} nameRu={'Адресаты'}>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Email
                                </th>
                                <th>Телефон</th>
                                <th>Имя</th>
                                <th>Прочитано</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mailing.contacts && mailing.contacts.map(el =>
                                <ContactsMailingTable c={el} key={el.id} />
                            )}
                        </tbody>
                    </table>
                </div>
            </Tab>
        </section>
    )
})

export default LogMailingsId;