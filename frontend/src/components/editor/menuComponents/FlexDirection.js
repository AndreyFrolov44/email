import React, { useState, useEffect } from "react";


const FlexDirection = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onChange(value);
    }, [value])

    useEffect(() => {
        console.log(value, props.value)
        if (props.value === value) return;
        setValue(props.value);
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Расположение</span>
                <div className="editor-menu-collapse-inputs-block select">
                    <select value={value} onChange={(e) => setValue(e.target.value)}>
                        <option value={'row'}>Горизонтально</option>
                        <option value={'column'}>Вертикально</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FlexDirection;