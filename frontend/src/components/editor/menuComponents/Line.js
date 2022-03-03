import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";


const Line = (props) => {
    const [border, setBorder] = useState({
        height: props.value.height,
        type: props.value.type,
        color: props.value.color
    });
    const [borderColorActive, setBorderColorActive] = useState({
        top: false,
    });

    useEffect(() => {
        props.onChange(border);
    }, [border])

    useEffect(() => {
        if (props.value.height === border.height &&
            props.value.type === border.type &&
            props.value.color.r === border.color.r &&
            props.value.color.g === border.color.g &&
            props.value.color.b === border.color.b
        ) return
        setBorder({
            ...props.value
        });
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Линия</span>
                <div className={`editor-menu-collapse-inputs active`}>
                    <div className="editor-menu-collapse-inputs-block select">
                        <select value={border.type} onChange={(e) =>
                            setBorder({
                                ...border,
                                type: e.target.value,
                                rightType: e.target.value,
                                bottomType: e.target.value,
                                leftType: e.target.value,
                            })}>
                            <option value={'solid'}>Сплошной</option>
                            <option value={'dotted'}>Пунктирный</option>
                            <option value={'dashed'}>Шртрихованный</option>
                        </select>
                        <div className="editor-menu-collapse-block-flex">
                            <div className="editor-menu-collapse-input">
                                <button onClick={() => {
                                    if (border.height <= 0) return;
                                    setBorder({
                                        ...border,
                                        height: border.height - 1,
                                    })
                                }}>-</button>
                                <input className="number" type="text" value={border.height} onChange={(e) => {
                                    if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                        setBorder({
                                            ...border,
                                            height: e.target.value,
                                        })
                                }} />
                                <button onClick={() =>
                                    setBorder({
                                        ...border,
                                        height: border.height + 1,
                                    })
                                }>+</button>
                            </div>
                            <div onClick={() => setBorderColorActive({ ...borderColorActive, all: true })} className="editor-menu-color" style={{ backgroundColor: `rgb(${border.color.r}, ${border.color.g}, ${border.color.b})` }}></div>
                            {borderColorActive.all &&
                                <div className="editor-menu-color-container">
                                    <div style={{
                                        position: 'fixed',
                                        top: '0px',
                                        right: '0px',
                                        bottom: '0px',
                                        left: '0px',
                                    }} onClick={() => setBorderColorActive({ ...borderColorActive, all: false })} />
                                    <SketchPicker color={border.color} onChange={(color) => setBorder({ ...border, color: color.rgb, rightColor: color.rgb, bottomColor: color.rgb, leftColor: color.rgb })} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Line;