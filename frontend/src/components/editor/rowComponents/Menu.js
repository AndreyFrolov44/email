import React from "react";


const Menu = (props) => {
    return (
        <ul className="component-menu" style={props.element.listStyle}>
            {props.element.items.map((item, i) =>
                <li key={i}>
                    <a style={props.element.listStyle.flexDirection === 'column' || props.element.items.length - 1 === i ? { ...props.element.style, margin: '0' } : props.element.style} href={item.actionType === 'site' ? item.url : item.actionType === 'mail' ? `mailto:${item.toEmail}?subject=${item.subjectEmail}&body=${item.contentEmail}` : `tel:${item.phone}`}>{item.text}</a>
                </li>
            )
            }
        </ul >
    )
}

export default Menu;