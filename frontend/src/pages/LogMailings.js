import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import Mailings from "../components/mailings/Mailings";
import { Link } from "react-router-dom";
import { MAILINING_CREATE } from "../utils/consts";

const LogMailings = observer((props) => {
    const [mailingsList, setMailingsList] = useState([]);

    const [limit, setLimit] = useState(100);
    const [skip, setSkip] = useState(0);

    const { mailings } = useContext(Context)

    useEffect(() => {
        mailings.allMailings(limit, skip)
            .then(() => {
                setMailingsList(mailings.mailings);
            });
    }, [null])

    return (
        <section className={props.sideBarActive ? 'mailing menu-active' : 'mailing menu-closed'} id="section">
            <h1>Рассылки</h1>
            <Link to={MAILINING_CREATE} className="button">Создать новую рассылку</Link>
            <ul className="mailing-list">
                {mailingsList.map(el =>
                    <Mailings m={el} key={el.id} />
                )}
            </ul>
        </section>
    )
})

export default LogMailings;