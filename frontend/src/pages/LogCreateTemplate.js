import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import EmailEditor from "../components/editor/EmailEditor";


const LogCreateTemplate = observer((props) => {
    useEffect(() => {
        props.setSideBarActive(false);
    }, [null])

    return (
        <section className="log-template-create" id="section">
            <EmailEditor />
        </section>
    )
})

export default LogCreateTemplate;