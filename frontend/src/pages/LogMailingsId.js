import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { Context } from "..";
import Tab from "../components/tab/Tab";

import sent from '../assets/img/send.svg';
import delivery from '../assets/img/mail.svg';
import read from '../assets/img/read.svg';
import transition from '../assets/img/cursor.svg';
import unfollow from '../assets/img/people.svg';
import trash from '../assets/img/trash.svg';
import ContactsMailingTable from "../components/table/ContactsMailingTable";

const LogMailingsId = observer((props) => {
    const params = useParams();
    const [tabActive, setTabActive] = useState('statistics');

    const [mailing, setMailing] = useState({});
    const [contactsList, setContactsList] = useState([]);

    const [limit, setLimit] = useState(100);
    const [skip, setSkip] = useState(0);

    const { mailings, contacts } = useContext(Context)

    useEffect(() => {
        mailings.InfoMailings(params.id)
            .then(() => {
                setMailing(mailings.mailingsInfo)
            })
    }, [null])

    useEffect(() => {
        if (mailing.list_id)
            contacts.allContactsInList(mailing.list_id, limit, skip)
                .then(() => {
                    setContactsList(contacts.contacts)
                })
    }, [mailing])

    return (
        <section className={props.sideBarActive ? 'mailing-details menu-active' : 'mailing-details menu-closed'} id="section">
            <h1>{mailing.title}</h1>
            <p>ИСПРАВИТЬ ДОБАВЛЕНИЕ КОНТАКТОВ</p>
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
                        <li className="mailing-details-item">
                            <div className="mailing-details-img"><img src={transition} alt="Переходы" /></div>
                            <div className="mailing-details-item-text">
                                <span className="cart-num">{mailing.transition}/{mailing.read}</span>
                                <span className="cart-text">Переходы</span>
                            </div>
                        </li>
                        <li className="mailing-details-item">
                            <div className="mailing-details-img"><img src={unfollow} alt="Отписок" /></div>
                            <div className="mailing-details-item-text">
                                <span className="cart-num">{mailing.unfollow}</span>
                                <span className="cart-text">Отписок</span>
                            </div>
                        </li>
                        <li className="mailing-details-item">
                            <div className="mailing-details-img"><img src={trash} alt="Добавили в спам" /></div>
                            <div className="mailing-details-item-text">
                                <span className="cart-num">{mailing.spam}</span>
                                <span className="cart-text">Добавили в спам</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div name={'address'} nameRu={'Адресаты'}>
                    <input type="text" className="tab-search" placeholder="Поиск по названию" />
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                    Email
                                </th>
                                <th>Телефон</th>
                                <th>Имя</th>
                                <th>Состояние</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactsList.map(el =>
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