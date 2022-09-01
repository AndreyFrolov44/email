import React from "react";
import { observer } from "mobx-react-lite";

const MailingTemplates = observer((props) => {
    return (
        <div className="template-item template-popup" onClick={() => {
            props.setSelected(props.t);
            props.popup(false);
        }}>
            <div className="template-item-img"><img src={props.t.img} alt={props.t.name} /></div>
            <div className="template-item-name">{props.t.name}</div>
        </div>
    )
})

export default MailingTemplates;