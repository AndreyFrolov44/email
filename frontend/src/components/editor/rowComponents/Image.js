import React from "react";


const Image = (props) => {
    return (
        <img style={props.element.style} src={props.element.src} alt={props.element.alt} />
    )
}

export default Image;