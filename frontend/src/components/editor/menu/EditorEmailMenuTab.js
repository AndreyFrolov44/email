import React, { useState, useEffect } from "react";


const EditorEmailMenuTab = (props) => {
    const [tabActive, setTabActive] = useState(0);

    useEffect(() => {
        setTabActive(0);
    }, [props.focusRow])

    return (
        <div className="editor-menu-properties">
            <div className="editor-menu-properties-tab">
                {props.focusRow.content && props.focusRow.content.map((el, i) =>
                    <span key={i} className={tabActive === i ? 'active' : ''} onClick={() => setTabActive(i)}>Колонка {i + 1}</span>
                )}
            </div>
            {props.focusRow.content && props.focusRow.content.map((el, i) =>
                <div key={i} className={`editor-menu-property ${tabActive === i ? 'active' : ''}`}>
                    <props.item columnIndex={i} focusRow={props.focusRow} currentRow={props.rows.indexOf(props.focusRow)} rows={props.rows} setRows={props.setRows} />
                </div>
            )}
        </div>
    )
}

export default EditorEmailMenuTab;