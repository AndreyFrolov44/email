import React, { useState, useEffect } from "react";

import { SketchPicker } from "react-color";


const Color = (props) => {
    const [colorActive, setColorActive] = useState(false);
    const [color, setColor] = useState({ ...props.value })

    useEffect(() => {
        props.onChange(color);
    }, [color])

    useEffect(() => {
        if (color.r === props.value.r &&
            color.g === props.value.g &&
            color.b === props.value.b) return
        setColor({ ...props.value });
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Цвет текста</span>
                <div onClick={() => setColorActive(!colorActive)} className="editor-menu-color" style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}></div>
                {colorActive &&
                    <div className="editor-menu-color-container">
                        <div style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                        }} onClick={() => setColorActive(!colorActive)} />
                        <SketchPicker color={color} onChange={(color) => setColor(color.rgb)} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Color;