import React, { useState } from "react";


const EditorEmailMenuCollapse = (props) => {
    const [active, setActive] = useState(true);

    return (
        <div className="editor-menu-collapse">
            <h5 className="editor-menu-collapse-title" onClick={() => setActive(!active)}>{props.title}</h5>
            <div className={`editor-menu-collapse-block ${active ? 'active' : ''}`}>
                {props.children}
            </div>
        </div>
    )
}

export default EditorEmailMenuCollapse;