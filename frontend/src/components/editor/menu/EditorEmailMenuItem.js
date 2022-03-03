import React from "react";


const EditorEmailMenuItem = (props) => {
    const dragEnd = (e) => {
        props.set([]);
    }

    const dragStart = (e) => {
        if (props.elementName === 'columns')
            props.set([{ style: { 'width': '50%' }, elements: [] }, { style: { 'width': '50%' }, elements: [] }]);
        else
            props.setNewElements(props.elementName);
    }

    return (
        <div className="editor-menu-item" draggable="true" onDragStart={dragStart} onDragEnd={dragEnd}>
            <props.svg />
            <span>{props.title}</span>
        </div>
    )
}

export default EditorEmailMenuItem;