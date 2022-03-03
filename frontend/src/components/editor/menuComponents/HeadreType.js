import React, { useState, useEffect } from "react";


const HeaderType = (props) => {
    const [value, setValue] = useState(props.value);
    const [type, setType] = useState(props.type);

    useEffect(() => {
        props.onChange(value, type);
    }, [value])

    useEffect(() => {
        if (value === props.value) return;
        setValue(props.value);
        setType(props.type);
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Тип заголовка</span>
                <div className="editor-menu-collapse-flex">
                    <span className={`editor-menu-collapse-align ${type === "h1" ? 'active' : ''}`} onClick={() => { setValue(22); setType("h1") }}>H1</span>
                    <span className={`editor-menu-collapse-align ${type === "h2" ? 'active' : ''}`} onClick={() => { setValue(20); setType("h2") }}>H2</span>
                    <span className={`editor-menu-collapse-align ${type === "h3" ? 'active' : ''}`} onClick={() => { setValue(18); setType("h3") }}>H3</span>
                    <span className={`editor-menu-collapse-align ${type === "h4" ? 'active' : ''}`} onClick={() => { setValue(16); setType("h4") }}>H4</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderType;