import React from "react";
import { observer } from "mobx-react-lite";

const MailingTemplates = observer((props) => {
    return (
        <div className="template-item template-popup" onClick={() => {
            props.setSelected(props.t);
            props.popup(false);
        }}>
            <div className="template-item-img"><img src={'http://127.0.0.1:8000/' + props.t.img} alt={props.t.name} /></div>
            <div className="template-item-name">{props.t.name}</div>
        </div>
    )
})

export default MailingTemplates;