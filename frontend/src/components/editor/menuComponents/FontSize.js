import React, { useState, useEffect } from "react";


const FontSize = (props) => {
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
                <span>Размер шрифта</span>
                <div className="editor-menu-collapse-input">
                    <button onClick={() => {
                        if (value <= 1) return
                        setValue(value - 1)
                    }}>-</button>
                    <input type="text" className="number" value={value} onChange={(e) => {
                        if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                            setValue(parseInt(e.target.value))
                    }} />
                    <button onClick={() => setValue(value + 1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default FontSize;