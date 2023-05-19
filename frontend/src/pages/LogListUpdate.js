import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import { Context } from "..";
import { LOG_LISTS_ID } from "../utils/consts";

const LogListUpdate = observer((props) => {
    const params = useParams();

    const [list, setList] = useState({});
    const [listName, setListName] = useState('');
    const [nameError, setNameError] = useState(false)

    const { lists } = useContext(Context);

    let navigate = useNavigate();

    const listUpdate = (e) => {
        e.preventDefault();
        if (listName === "")
            setNameError(true);
        else {
            lists.updateList(list.id, listName);
            navigate(LOG_LISTS_ID.replace(':id', list.id));
        }
    }

    useEffect(() => {
        lists.getInfo(params.id)
            .then(() => {
                setListName(lists.list.name);
                setList(lists.list)
            })
    }, [null])

    return (
        <section className={props.sideBarActive ? 'log-list-create menu-active' : 'log-list-create menu-closed'} id="section">
            <h1>Изменение списка</h1>
            <form>
                <label for="name">Введите название списка</label>
                <input id="name" placeholder="Название" className={nameError && "error"} value={listName} type="text" onChange={e => setListName(e.target.value)} />
                <div className="buttons">
                    <button className="button" onClick={listUpdate}>Сохранить</button>
                </div>
            </form>
        </section>
    )
})

export default LogListUpdate;