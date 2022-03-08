import React, { useState, useEffect } from "react";


const Input = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onChange(value);
    }, [value])

    useEffect(() => {
        if (props.value === value) return;
        setValue(props.value);
    }, [props.value])

    return (
        <div className="editor-menu-collapse-input">
            <span className="span-label">{props.title}</span>
            <input className="text-span" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}

export default Input