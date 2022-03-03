import React from "react";


const Button = (props) => {
    const change = (e) => {
        const indexRow = props.rows.indexOf(props.row);
        const rows = [...props.rows];
        const indexColumn = rows[indexRow].content.indexOf(props.content);
        const indexElement = rows[indexRow].content[indexColumn].elements.indexOf(props.element)
        rows[indexRow].content[indexColumn].elements[indexElement] = {
            ...props.row.content[indexColumn].elements[indexElement],
            text: e.target.outerText,
        };
        props.setRows(rows);
    }

    return (
        <a className="component-button" contentEditable={true} suppressContentEditableWarning={true} style={props.element.style} onBlur={change}>{props.element.text}</a>
    )
}

export default Button;