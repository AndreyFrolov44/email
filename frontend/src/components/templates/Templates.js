import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { TEMPLATES_ROUTE } from "../../utils/consts";

const Templates = observer((props) => {

    return (
        <div className="template-item">
            <div className="template-item-img"><img src={props.t.img} alt={props.t.name} /></div>
            <div className="template-item-name">
                <Link to={TEMPLATES_ROUTE + props.t.id}>{props.t.name}</Link>
            </div>
        </div>
    )
})

export default Templates;