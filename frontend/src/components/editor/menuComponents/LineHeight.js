import React, { useState, useEffect } from "react";


const LineHeight = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onChange(value);
    }, [value])

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Высота строки</span>
                <div className="editor-menu-collapse-input">
                    <button onClick={() => {
                        if (props.value <= 100) return
                        setValue(value - 10)
                    }}>-</button>
                    <input type="text" disabled className="number" value={`${props.value}%`} />
                    <button onClick={() => setValue(value + 10)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default LineHeight;