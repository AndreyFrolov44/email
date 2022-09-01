import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import { CREATE_TEMPLATES_ROUTE, MAILINING_CREATE, TEMPLATES_ROUTE } from "../utils/consts";
import { Context } from "..";
import Popup from "../components/popup/Popup";

const LogTemplateInfo = (props) => {
    const params = useParams()
    const [template, setTemplate] = useState({});
    let navigate = useNavigate();

    const [popupActive, setPopupActive] = useState(false);

    const { templates } = useContext(Context)


    const deleteTemplate = (e, id) => {
        e.preventDefault();
        templates.deleteTemplate(id);
        navigate(TEMPLATES_ROUTE)
    }

    useEffect(() => {
        templates.templateInfo(params.id).then(t => setTemplate(t));
    }, [null])

    return (
        <section className={props.sideBarActive ? 'template-info menu-active' : 'template menu-closed'} id="section">
            <h1>{template.name}</h1>
            <Link to={MAILINING_CREATE + '?template=' + template.id}>Создать рассылку с этим шаблоном</Link>
            <div className="buttons">
                {/* <button className="button">Изменить</button> */}
                <Link to={CREATE_TEMPLATES_ROUTE + template.id} className="button">Изменить</Link>
                <button className="button button-dark" onClick={(e) => setPopupActive(true)}>Удалить</button>
            </div>
            <img src={template.img} alt={template.name} />
            {popupActive &&
                <Popup hide={true} click={setPopupActive}>
                    <h2>Вы уверены что хотите удалить данный шаблон?</h2>
                    <div className="buttons">
                        <button className="button" onClick={() => setPopupActive(false)}>Отмена</button>
                        <button className="button button-dark" onClick={(e) => deleteTemplate(e, template.id)}>Удалить</button>
                    </div>
                </Popup>
            }
        </section>
    )
}

export default LogTemplateInfo;