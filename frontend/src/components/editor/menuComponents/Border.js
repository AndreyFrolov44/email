import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";


const Border = (props) => {
    const [borderDetail, setBorderDetail] = useState(false);
    const [border, setBorder] = useState({
        top: props.value.top,
        right: props.value.right,
        bottom: props.value.bottom,
        left: props.value.left,
        topType: props.value.topType,
        rightType: props.value.rightType,
        bottomType: props.value.rightType,
        leftType: props.value.rightType,
        topColor: props.value.topColor,
        rightColor: props.value.rightColor,
        bottomColor: props.value.rightColor,
        leftColor: props.value.rightColor,
    });
    const [borderColorActive, setBorderColorActive] = useState({
        all: false,
        top: false,
        right: false,
        bottom: false,
        left: false
    });

    useEffect(() => {
        props.onChange(border);
    }, [border])

    useEffect(() => {
        if (props.value.top === border.top &&
            props.value.right === border.right &&
            props.value.bottom === border.bottom &&
            props.value.left === border.left &&
            props.value.topType === border.topType &&
            props.value.rightType === border.rightType &&
            props.value.bottomType === border.bottomType &&
            props.value.leftType === border.leftType &&
            props.value.topColor.r === border.topColor.r &&
            props.value.topColor.g === border.topColor.g &&
            props.value.topColor.b === border.topColor.b &&
            props.value.rightColor.r === border.rightColor.r &&
            props.value.rightColor.g === border.rightColor.g &&
            props.value.rightColor.b === border.rightColor.b &&
            props.value.bottomColor.r === border.bottomColor.r &&
            props.value.bottomColor.g === border.bottomColor.g &&
            props.value.bottomColor.b === border.bottomColor.b &&
            props.value.leftColor.r === border.leftColor.r &&
            props.value.leftColor.g === border.leftColor.g &&
            props.value.leftColor.b === border.leftColor.b
        ) return
        setBorder({
            ...props.value
        });
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Граница</span>
                <div className="editor-menu-collapse-checkbox">
                    <span>Все параметры</span>
                    <input value={borderDetail} onChange={() => setBorderDetail(!borderDetail)} type="checkbox" />
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${!borderDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block select">
                    <span>Все стороны</span>
                    <select value={border.topType} onChange={(e) =>
                        setBorder({
                            ...border,
                            topType: e.target.value,
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
                                if (border.top <= 0) return;
                                setBorder({
                                    ...border,
                                    top: border.top - 1,
                                    right: border.top - 1,
                                    bottom: border.top - 1,
                                    left: border.top - 1,
                                })
                            }}>-</button>
                            <input className="number" type="text" value={border.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({
                                        ...border,
                                        top: e.target.value,
                                        right: e.target.value,
                                        bottom: e.target.value,
                                        left: e.target.value,
                                    })
                            }} />
                            <button onClick={() =>
                                setBorder({
                                    ...border,
                                    top: border.top + 1,
                                    right: border.top + 1,
                                    bottom: border.top + 1,
                                    left: border.top + 1,
                                })
                            }>+</button>
                        </div>
                        <div onClick={() => setBorderColorActive({ ...borderColorActive, all: true })} className="editor-menu-color" style={{ 'background-color': `rgb(${border.topColor.r}, ${border.topColor.g}, ${border.topColor.b})` }}></div>
                        {borderColorActive.all &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setBorderColorActive({ ...borderColorActive, all: false })} />
                                <SketchPicker color={border.topColor} onChange={(color) => setBorder({ ...border, topColor: color.rgb, rightColor: color.rgb, bottomColor: color.rgb, leftColor: color.rgb })} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${borderDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block select">
                    <span>Верх</span>
                    <select value={border.topType} onChange={(e) => setBorder({ ...border, topType: e.target.value })}>
                        <option value={'solid'}>Сплошной</option>
                        <option value={'dotted'}>Пунктирный</option>
                        <option value={'dashed'}>Шртрихованный</option>
                    </select>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.top <= 0) return;
                                setBorder({ ...border, top: border.top - 1 })
                            }}>-</button>
                            <input type="text" className="number" value={border.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, top: e.target.value })
                            }} />
                            <button onClick={() => setBorder({ ...border, top: border.top + 1 })}>+</button>
                        </div>
                        <div onClick={() => setBorderColorActive({ ...borderColorActive, top: true })} className="editor-menu-color" style={{ 'background-color': `rgb(${border.topColor.r}, ${border.topColor.g}, ${border.topColor.b})` }}></div>
                        {borderColorActive.top &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setBorderColorActive({ ...borderColorActive, top: false })} />
                                <SketchPicker color={border.topColor} onChange={(color) => setBorder({ ...border, topColor: color.rgb })} />
                            </div>
                        }
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block select">
                    <span>Справа</span>
                    <select value={border.rightType} onChange={(e) => setBorder({ ...border, rightType: e.target.value })}>
                        <option value={'solid'}>Сплошной</option>
                        <option value={'dotted'}>Пунктирный</option>
                        <option value={'dashed'}>Шртрихованный</option>
                    </select>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.right <= 0) return;
                                setBorder({ ...border, right: border.right - 1 })
                            }}>-</button>
                            <input type="text" className="number" value={border.right} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, right: e.target.value });
                            }} />
                            <button onClick={() => setBorder({ ...border, right: border.right + 1 })}>+</button>
                        </div>
                        <div onClick={() => setBorderColorActive({ ...borderColorActive, right: true })} className="editor-menu-color" style={{ 'background-color': `rgb(${border.rightColor.r}, ${border.rightColor.g}, ${border.rightColor.b})` }}></div>
                        {borderColorActive.right &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setBorderColorActive({ ...borderColorActive, right: false })} />
                                <SketchPicker color={border.rightColor} onChange={(color) => setBorder({ ...border, rightColor: color.rgb })} />
                            </div>
                        }
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block select">
                    <span>Слева</span>
                    <select value={border.leftType} onChange={(e) => setBorder({ ...border, leftType: e.target.value })}>
                        <option value={'solid'}>Сплошной</option>
                        <option value={'dotted'}>Пунктирный</option>
                        <option value={'dashed'}>Шртрихованный</option>
                    </select>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.left <= 0) return;
                                setBorder({ ...border, left: border.left - 1 })
                            }}>-</button>
                            <input type="text" className="number" value={border.left} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, left: e.target.value });
                            }} />
                            <button onClick={() => setBorder({ ...border, left: border.left + 1 })}>+</button>
                        </div>
                        <div onClick={() => setBorderColorActive({ ...borderColorActive, left: true })} className="editor-menu-color" style={{ 'background-color': `rgb(${border.leftColor.r}, ${border.leftColor.g}, ${border.leftColor.b})` }}></div>
                        {borderColorActive.left &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setBorderColorActive({ ...borderColorActive, left: false })} />
                                <SketchPicker color={border.leftColor} onChange={(color) => setBorder({ ...border, leftColor: color.rgb })} />
                            </div>
                        }
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block select">
                    <span>Низ</span>
                    <select value={border.bottomType} onChange={(e) => setBorder({ ...border, bottomType: e.target.value })}>
                        <option value={'solid'}>Сплошной</option>
                        <option value={'dotted'}>Пунктирный</option>
                        <option value={'dashed'}>Шртрихованный</option>
                    </select>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.bottom <= 0) return;
                                setBorder({ ...border, bottom: border.bottom - 1 })
                            }}>-</button>
                            <input type="text" className="number" value={border.bottom} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, bottom: e.target.value });
                            }} />
                            <button onClick={() => setBorder({ ...border, bottom: border.bottom + 1 })}>+</button>
                        </div>
                        <div onClick={() => setBorderColorActive({ ...borderColorActive, bottom: true })} className="editor-menu-color" style={{ 'background-color': `rgb(${border.bottomColor.r}, ${border.bottomColor.g}, ${border.bottomColor.b})` }}></div>
                        {borderColorActive.bottom &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setBorderColorActive({ ...borderColorActive, bottom: false })} />
                                <SketchPicker color={border.bottomColor} onChange={(color) => setBorder({ ...border, bottomColor: color.rgb })} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Border;