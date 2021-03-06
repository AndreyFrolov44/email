import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { Context } from "..";
import { LOG_LISTS, LOG_CONTACTS_CREATE } from "../utils/consts";
import Popup from "../components/popup/Popup";
import MailingTemplates from "../components/templates/MailingTemplates";
import { MAILININGS_ROUTE } from "../utils/consts";

const LogMailingCreate = observer((props) => {
    const [mailingName, setMailingName] = useState('');
    const [listsList, setListsList] = useState([]);
    const [selectedList, setSelectedList] = useState({});
    const [templatesList, setTemplatesList] = useState([]);
    const [selectedTemplate, setSelectedTemaplste] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [organisationName, setOrganisationName] = useState('');

    const [clickTemplatePopup, setClickTemplatePopup] = useState(false);

    const [error, setError] = useState(false);

    const [limit, setLimit] = useState(100);
    const [skip, setSkip] = useState(0);

    const { mailings, lists, templates } = useContext(Context);

    let navigate = useNavigate();

    const changeList = (e) => {
        setSelectedList(listsList.find(list => list.name === e.target.value))
    }

    const mailingCreate = (e) => {
        e.preventDefault();
        if (mailingName && selectedList.id && selectedTemplate.id && userEmail && organisationName) {
            mailings.createMailing(mailingName, userEmail, organisationName, selectedList.id, selectedTemplate.id);
            navigate(MAILININGS_ROUTE);
        } else setError(true);
    }

    useEffect(() => {
        lists.allLists(10000, 0)
            .then(() => {
                setListsList(lists.lists);
            })

        templates.allSaved(limit, skip)
            .then(() => {
                setTemplatesList(templates.savedTemplates);
            });
    }, [null])

    return (
        <section className={props.sideBarActive ? 'mailing-create menu-active' : 'mailing-create menu-closed'} id="section">
            <h1>???????????????? ????????????????</h1>
            <form>
                <label for="name">?????????????? ???????????????? ????????????????</label>
                <input id="name" type="text" value={mailingName} onChange={(e) => setMailingName(e.target.value)} />
                <label for="list">???????????????? ????????????</label>
                <select id="list" value={selectedList.name} onChange={changeList}>
                    <option value="">---</option>
                    {listsList.map(({ name, id }) =>
                        <option value={name}>{name}</option>
                    )}
                </select>
                {selectedList.id &&
                    <Link className="link" to={LOG_LISTS + selectedList.id} target="_blank">???????????????????? ????????????</Link>
                }
                {selectedList.contacts_count === 0 &&
                    <p>?? ???????????? ???????????? ?????? ??????????????????. <Link className="link" to={LOG_CONTACTS_CREATE + '?list=' + selectedList.name}>?????????????? ?????????? ????????????????</Link></p>
                }
                <label>???????????????? ????????????</label>
                <input disabled value={selectedTemplate.name} /><span className="link" onClick={() => { setClickTemplatePopup(!clickTemplatePopup) }}>??????????????</span>
                {clickTemplatePopup &&
                    <Popup width={500} hide={true} click={setClickTemplatePopup}>
                        <h2>?????????????????????? ??????????????</h2>
                        <div className="template-wrap">
                            {templatesList.map(el =>
                                <MailingTemplates popup={setClickTemplatePopup} setSelected={setSelectedTemaplste} t={el} />
                            )}
                        </div>
                    </Popup>
                }
                <label for="email">?????????????? ???????? ??????????</label>
                <input id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <label for="email">?????????????? ???????????????? ??????????????????????</label>
                <input id="email" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} />
                {error &&
                    <p className="error">?????? ???????? ?????????????? ???????? ??????????????????!</p>
                }
                <div className="buttons">
                    <button className="button" onClick={mailingCreate}>??????????????</button>
                </div>
            </form>
        </section>
    )
})

export default LogMailingCreate;