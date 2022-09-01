import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { Context } from "..";
import EmailEditor from "../components/editor/EmailEditor";


const LogEditTemplate = observer((props) => {
    const params = useParams()
    const { templates } = useContext(Context)

    const [rows, setRows] = useState()
    const [name, setName] = useState();

    useEffect(() => {
        props.setSideBarActive(false);
        templates.templateInfo(params.id).then((t) => {
            setRows(t.rows);
            setName(t.name);
        })
    }, [null])

    useEffect(() => {
        // console.log(rows)
    }, [rows])

    return (
        <section className="log-template-create" id="section">
            <EmailEditor rows={rows} name={name} id={params.id} />
        </section>
    )
})

export default LogEditTemplate;