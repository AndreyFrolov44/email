import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

import { Context } from "..";
import { LOG_CONTACTS } from "../utils/consts";

const LogListCreate = observer((props) => {
    const [listName, setListName] = useState('');
    const [nameError, setNameError] = useState(false)

    const { lists } = useContext(Context);

    let navigate = useNavigate();

    const listCreate = (e) => {
        e.preventDefault();
        if (listName === "")
            setNameError(true);
        else {
            lists.createList(listName);
            navigate(LOG_CONTACTS + '?tab=lists');
        }
    }

    return (
        <section className={props.sideBarActive ? 'log-list-create menu-active' : 'log-list-create menu-closed'} id="section">
            <h1>Создание нового списка</h1>
            <form>
                <label for="name">Введите название списка</label>
                <input id="name" placeholder="Название" className={nameError && "error"} value={listName} type="text" onChange={e => setListName(e.target.value)} />
                <div className="buttons">
                    <button className="button" onClick={listCreate}>Сохранить</button>
                    <button className="button">Сохранить и добавить еще</button>
                </div>
            </form>
        </section>
    )
})

export default LogListCreate;