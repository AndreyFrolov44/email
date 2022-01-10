import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "..";
import ContactsCreateTable from "../components/table/ContactsCreateTable";
import Popup from "../components/popup/Popup";
import { num_word } from "../utils/func";
import { LOG_CONTACTS } from "../utils/consts";

const LogContactsCreate = observer((props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [listsList, setListsList] = useState([]);
    const [currentList, setCurrentList] = useState(searchParams.get('list') === null ? "" : searchParams.get('list'));

    const [list, setList] = useState({});
    const [contactsList, setContactsList] = useState([]);

    const [num, setNum] = useState(5);

    const [popup, setPopup] = useState(false);

    const { lists } = useContext(Context);

    const contactsAdd = (e) => {
        e.preventDefault();
        setNum(num + 5);
    }

    const set = (value) => {
        let f = contactsList.find(contact => contact.id === value.id)
        if (typeof f === 'undefined') {
            setContactsList([...contactsList, value]);
            return;
        }
        let newArr = contactsList.map(contact => {
            if (contact.id == value.id) {
                return value;
            }
            return contact;
        });
        setContactsList([...newArr])
    }

    const createContactsBtn = (e) => {
        e.preventDefault()
        let createContactsHead = contactsList.map(el => {
            return {
                id: el.id,
                name: el.name,
                email: el.email,
                phone_number: el.phone,
                list_id: list.listId
            }
        });
        lists.createContacts(createContactsHead)
            .then(error => {
                if (error) {
                    for (let e of error) {
                        let contactError = contactsList.find(contact => contact.id === createContactsHead[e.loc[1]].id)
                        contactError.error = true;
                        setContactsList([...contactsList])
                    }
                } else setPopup(true);
            })
    }

    useEffect(() => {
        lists.allLists(10000, 0)
            .then(() => {
                setListsList(lists.lists);
            })
    }, [null])

    useEffect(() => {
        let isCurrentList = listsList.find(list => list.name === currentList)
        if (isCurrentList) setList({
            listName: isCurrentList.name,
            listId: isCurrentList.id
        })
    }, [listsList])

    return (
        <section className={props.sideBarActive ? 'log-contacts-create menu-active' : 'log-contacts-create menu-closed'} id="section">
            <h1>Добавление контактов</h1>
            <form>
                <label for="list">Выберите список</label>
                <select value={list.listName} id="list" onChange={(e) => {
                    setList({
                        listName: e.target.value,
                        listId: listsList.find(list => list.name === e.target.value)?.id
                    });
                }}>
                    <option value="">---</option>
                    {listsList.map(({ name, id }) =>
                        <option selected={parseInt(currentList) === id} value={name}>{name}</option>
                    )}
                </select>

                {list.listId &&
                    <>
                        <table className="input-table">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Телефон</th>
                                    <th>Имя</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(num)].map((x, i) =>
                                    <ContactsCreateTable key={i} id={i} setValue={set} error={contactsList.find(contact => {
                                        if (contact.error === true && contact.id === i) return contact
                                    }) ? true : false} />
                                )}
                            </tbody>
                        </table>
                        <div className="buttons">
                            <button className="button" onClick={contactsAdd}>Добавить еще</button>
                            <button className="button button-dark" disabled={contactsList.length == 0 ? true : false} onClick={createContactsBtn}>Сохранить</button>
                        </div>
                        {popup &&
                            <Popup>
                                <h2>Успех!</h2>
                                <p>Вы добавили {contactsList.length} {num_word(contactsList.length, ["контакт", "контакта", ["контактов"]])} в список "{list.listName}"</p>
                                <Link to={LOG_CONTACTS} className="button">Вернуться к контактам</Link>
                            </Popup>
                        }
                    </>
                }
            </form>
        </section>
    )
})

export default LogContactsCreate;