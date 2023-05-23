import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { Context } from "..";
import Templates from "../components/templates/Templates";
import Tab from "../components/tab/Tab";
import { CREATE_TEMPLATES_ROUTE, MAILINING_CREATE } from "../utils/consts";

const LogTemplates = observer((props) => {
    const [saved, setSaved] = useState([]);
    const [library, setLibrary] = useState([]);

    const [limit, setLimit] = useState(100);
    const [skip, setSkip] = useState(0);

    const { templates } = useContext(Context)

    useEffect(() => {
        templates.allSaved(limit, skip)
            .then(() => {
                setSaved(templates.savedTemplates);
            });
    }, [null])

    useEffect(() => {
        templates.allLibrary(limit, skip)
            .then(() => {
                setLibrary(templates.libraryTemplates);
            });
    }, [null])

    useEffect(() => {
        setSaved(templates.savedTemplates);
        props.setSideBarActive(true)
    }, [templates.savedTemplates])

    return (
        <section className={props.sideBarActive ? 'template menu-active' : 'template menu-closed'} id="section">
            <h1>Шаблоны</h1>
            <Tab>
                <div name={'saved'} nameRu={'Сохраненные'}>
                    <div className="tab-top">
                        <Link to={CREATE_TEMPLATES_ROUTE} className="button">Добавить новый шаблон</Link>
                    </div>
                    <div className="template-wrap">
                        {saved.map(el =>
                            <Templates t={el} key={el.id} />
                        )}
                    </div>
                </div>
                <div name={'library'} nameRu={'Библиотека'}>
                    <div className="tab-top">
                        <input type="text" className="tab-search" placeholder="Поиск по названию" />
                    </div>
                    <div className="template-wrap">
                        {library.map(el =>
                            <Templates t={el} key={el.id} />
                        )}
                    </div>
                </div>
            </Tab>
        </section>
    )
})

export default LogTemplates;