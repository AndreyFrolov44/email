import React, { useState, useEffect } from "react";


const FlexDirection = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onChange(value);
    }, [value])

    useEffect(() => {
        if (props.value === value) return;
        setValue(props.value);
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Расположение</span>
                <div className="editor-menu-collapse-inputs-block select">
                    <select value={value} onChange={(e) => setValue(e.target.value)}>
                        <option value={'inline-block'}>Горизонтально</option>
                        <option value={'block'}>Вертикально</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FlexDirection;