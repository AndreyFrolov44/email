import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";

import { Context } from "..";
import ListContactsTable from "../components/table/ListContactsTable";
import { LOG_CONTACTS_CREATE } from "../utils/consts";

const LogListsId = observer((props) => {
    const params = useParams();

    const [list, setList] = useState({});
    const [listContacts, setListContacts] = useState([]);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [contactsCheckAll, setContactsCheckAll] = useState(false);
    const [contactsCheck, setContactsCheck] = useState([]);

    const { lists, contacts } = useContext(Context);

    const date = new Date();

    const contactsSelectAll = e => {
        setContactsCheckAll(!contactsCheckAll);
        setContactsCheck(listContacts.map(el => el.id));
        lists.resetCheckedContacts();
        if (contactsCheckAll) {
            setContactsCheck([]);

        } else {
            listContacts.map(el => {
                lists.setCheckedContacts(el.id);
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
        lists.setCheckedContacts(parseInt(id));
        console.log(lists.checkedContacts);
    };

    useEffect(() => {
        lists.getInfo(params.id)
            .then(() => {
                setList(lists.list);
                setListContacts(lists.list.contacts);
            })
    }, [null])

    const deleteContacts = () => {
        lists.deleteContacts()
            .then(() => {
                setListContacts(lists.list.contacts);
            })
    }


    return (
        <section className={props.sideBarActive ? 'log-list menu-active' : 'log-list menu-closed'} id="section">
            <h1>Информация о списке</h1>
            <ul>
                <li>Название списка: {list.name}</li>
                <li>Дата создания: {dateFormat(list.date, "dd.mm.yyyy")}</li>
                <li>Количество контактов: {list.contacts_count}</li>
            </ul>
            {listContacts.length === 0 &&
                <p>В данном списке пока нет контактов</p>
            }
            <div className="buttons">
                <Link to={LOG_CONTACTS_CREATE + '?list=' + list.name} className="button">Добавить контакты</Link>
                {listContacts.length > 0 &&
                    <button className="button button-dark" disabled={lists.checkedContacts.length == 0 ? true : false} onClick={deleteContacts}>Удалить выбранные</button>
                }
            </div>
            {listContacts.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox"
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    onChange={contactsSelectAll}
                                    checked={contactsCheckAll}
                                />
                                Email
                            </th>
                            <th>Телефон</th>
                            <th>Имя</th>
                            <th>Дата добавления</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listContacts.map(el =>
                            <ListContactsTable
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
            }
        </section>
    )
})

export default LogListsId;