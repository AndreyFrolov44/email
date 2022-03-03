import React from "react";

import EditorEmailMenuColumns from "./EditorEmailMenuColumns";
import EditorEmailMenuButton from "./EditorEmailMenuButton";


const Menu = (props) => {
    if (props.focusRow.id) return <EditorEmailMenuColumns setNewColumns={props.setNewColumns} rows={props.rows} setRows={props.setRows} focusRow={props.focusRow} setFocusRow={props.setFocusRow} />
    else if (props.focusElement.element === undefined) return <></>
    else if (props.focusElement.element.element === 'button') return <EditorEmailMenuButton rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
}

export default Menu;