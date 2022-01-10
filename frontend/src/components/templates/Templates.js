import React from "react";
import { observer } from "mobx-react-lite";

const Templates = observer((props) => {
    return (
        <div className="template-item">
            <div className="template-item-img"><img src={'http://127.0.0.1:8000/' + props.t.img} alt={props.t.name} /></div>
            <div className="template-item-name"><a href="#">{props.t.name}</a></div>
        </div>
    )
})

export default Templates;