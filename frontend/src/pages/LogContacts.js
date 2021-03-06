import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "..";
import ContactsTable from '../components/table/ContactsTable';
import ListsTable from '../components/table/ListsTable';
import Tab from '../components/tab/Tab'
import { LOG_CONTACTS, LOG_CONTACTS_CREATE, LOG_LIST_CREATE } from "../utils/consts";
import Contacts from "./Contacts";

const LogContacts = observer((props) => {
    const [contactsCount, setContactsCount] = useState(0);
    const [contactsList, setContactsList] = useState([]);

    const [listsList, setListsList] = useState([]);

    const [limit, setLimit] = useState(100);
    const [skip, setSkip] = useState(0);

    const [contactsCheckAll, setContactsCheckAll] = useState(false);
    const [contactsCheck, setContactsCheck] = useState([]);

    const [listsCheckAll, setListsCheckAll] = useState(false);
    const [listsCheck, setListsCheck] = useState([]);

    const { contacts, lists } = useContext(Context);

    const contactsSelectAll = e => {
        setContactsCheckAll(!contactsCheckAll);
        setContactsCheck(contactsList.map(el => el.id));
        contacts.resetChecked();
        if (contactsCheckAll) {
            setContactsCheck([]);

        } else {
            contactsList.map(el => {
                contacts.setCheckedContacts(el.id);
            })
        }
    };

    const contactClick = e => {
        const { id, checked } = e.target;
        setContactsCheck([...contactsCheck, parseInt(id)]);
        setContactsCheckAll(false);
        if (!checked) {
            setContactsCheck(contactsCheck.filter(item => item !== parseInt(id)));
        }
        contacts.setCheckedContacts(parseInt(id));
        console.log(contacts.checkedListsId);
    };

    const listsSelectAll = e => {
        setListsCheckAll(!listsCheckAll);
        setListsCheck(listsList.map(el => el.id));
        lists.resetChecked();
        if (listsCheckAll) {
            setListsCheck([]);

        } else {
            listsList.map(el => {
                lists.setCheckedListsId(el.id);
            })
        }
    };

    const listClick = e => {
        const { id, checked } = e.target;
        setListsCheck([...listsCheck, parseInt(id)]);
        setListsCheckAll(false);
        if (!checked) {
            setListsCheck(listsCheck.filter(item => item !== parseInt(id)));
        }
        lists.setCheckedListsId(parseInt(id));
        console.log(lists.checkedListsId);
    };

    useEffect(() => {
        contacts.countContacts()
            .then(() => {
                setContactsCount(contacts.contactsCount);
            });
    }, [null])

    useEffect(() => {
        lists.resetChecked();
        lists.allLists(limit, skip)
            .then(() => {
                setListsList(lists.lists);
            });
    }, [null])

    useEffect(() => {
        setListsList(lists.lists);
    }, [lists.lists])

    useEffect(() => {
        setContactsList(contacts.contacts);
    }, [contacts.contacts])

    useEffect(() => {
        contacts.allContacts(limit, skip)
            .then(() => {
                setContactsList(contacts.contacts);
            });
    }, [limit, skip])

    return (
        <section id="section" className={props.sideBarActive ? 'log-contact menu-active' : 'log-contact menu-closed'}>
            <h1>????????????????</h1>
            <h2>?? ?????? ?????????????????? {contactsCount} ????????????????</h2>
            <p>???? ???????????? ????????????, ?????? ???????????????? ?????? ???????????????? ?????????????? ????????????????. ?????? ???????????????????? ???????????????????? ???????????????????? ?????????????????? - ???????????????? ???????? ??????????. </p>
            <a href="#" className="contact-link">?????????????????????? ??????????</a>
            <Tab>
                <div name={'contacts'} nameRu={'????????????????'}>
                    <div className="tab-top">
                        <Link to={LOG_CONTACTS_CREATE} className="button">???????????????? ?????????? ????????????????</Link>
                        <input type="text" className="tab-search" placeholder="?????????? ???? email" />
                        <button className="button button-dark" disabled={contacts.checkedContacts.length == 0 ? true : false} onClick={() => contacts.deleteContacts()}>?????????????? ??????????????????</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        onChange={contactsSelectAll}
                                        checked={contactsCheckAll}
                                    />
                                    Email
                                </th>
                                <th>??????????????</th>
                                <th>??????</th>
                                <th>???????? ????????????????????</th>
                                <th>???????????????? ????????????</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactsList.map((el) =>
                                <ContactsTable
                                    key={el.id}
                                    type="checkbox"
                                    id={el.id}
                                    handleClick={contactClick}
                                    isChecked={contactsCheck.includes(el.id)}
                                    c={el}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                <div name={'lists'} nameRu={'????????????'}>
                    <div className="tab-top">
                        <Link to={LOG_LIST_CREATE} className="button">???????????????? ?????????? ????????????</Link>
                        <input type="text" className="tab-search" placeholder="?????????? ???? ????????????????" />
                        <button className="button button-dark" disabled={lists.checkedListsId.length == 0 ? true : false} onClick={() => lists.deleteLists()}>?????????????? ??????????????????</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        onChange={listsSelectAll}
                                        checked={listsCheckAll}
                                    />
                                    ???????????????? ????????????
                                </th>
                                <th>???????? ????????????????</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listsList.map(el =>
                                <ListsTable
                                    key={el.id}
                                    type="checkbox"
                                    id={el.id}
                                    handleClick={listClick}
                                    isChecked={listsCheck.includes(el.id)}
                                    l={el}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </Tab>
        </section>
    )
})

export default LogContacts;