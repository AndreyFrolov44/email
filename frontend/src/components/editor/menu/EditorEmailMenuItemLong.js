import React from "react";


const EditorEmailMenuItemLong = (props) => {
    const click = (e) => {
        props.set(props.columns);
    }

    return (
        <div className="editor-menu-item-long" onClick={click}>
            {/* <props.svg /> */}
            <img src={props.svg} />
        </div>
    )
}

export default EditorEmailMenuItemLong;