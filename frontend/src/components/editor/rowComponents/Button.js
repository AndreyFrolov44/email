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
        <a className="component-button" href={props.element.actionType === 'site' ? props.element.url : props.element.actionType === 'mail' ? `mailto:${props.element.toEmail}?subject=${props.element.subjectEmail}&body=${props.element.contentEmail}` : `tel:${props.element.phone}`} disabled={true} contentEditable={true} suppressContentEditableWarning={true} style={props.element.style} onBlur={change}>{props.element.text}</a>
    )
}

export default Button;