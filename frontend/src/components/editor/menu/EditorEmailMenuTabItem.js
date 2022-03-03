import React, { useState, useEffect } from "react";
import { SketchPicker } from 'react-color';


const EditorEmailMenuTabItem = (props) => {
    const [colorActive, setColorActive] = useState(false);
    const [color, setColor] = useState();
    // const [border, setBorder] = useState({ top: 0, right: 0, bottom: 0, left: 0, topType: 'solid', rightType: 'solid', bottomType: 'solid', leftType: 'solid', topColor: {}, rightColor: {}, bottomColor: {}, leftColor: {} })
    const [border, setBorder] = useState({
        top: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-width'] ? parseInt(props.rows[props.currentRow].content[props.culumnIndex].style['border-width'].split(" ")[0]) : 0,
        right: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-width'] ? parseInt(props.rows[props.currentRow].content[props.culumnIndex].style['border-width'].split(" ")[1]) : 0,
        bottom: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-width'] ? parseInt(props.rows[props.currentRow].content[props.culumnIndex].style['border-width'].split(" ")[2]) : 0,
        left: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-width'] ? parseInt(props.rows[props.currentRow].content[props.culumnIndex].style['border-width'].split(" ")[3]) : 0,
        topType: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-style'] ? props.rows[props.currentRow].content[props.culumnIndex].style['border-style'].split(" ")[0] : 'solid',
        rightType: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-style'] ? props.rows[props.currentRow].content[props.culumnIndex].style['border-style'].split(" ")[1] : 'solid',
        bottomType: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-style'] ? props.rows[props.currentRow].content[props.culumnIndex].style['border-style'].split(" ")[2] : 'solid',
        leftType: props.rows[props.currentRow] && props.rows[props.currentRow].content[props.culumnIndex].style['border-style'] ? props.rows[props.currentRow].content[props.culumnIndex].style['border-style'].split(" ")[3] : 'solid',
        topColor: {},
        rightColor: {},
        bottomColor: {},
        leftColor: {}
    })
    const [borderDetail, setBorderDetail] = useState(false);
    const [borderColorActive, setBorderColorActive] = useState({ top: false, right: false, bottom: false, left: false, all: false })

    const colorChange = (color) => {
        setColor(color.rgb);
    }

    const BorderTypeSelect = (e) => {
        setBorder({
            ...border,
            topType: e.target.value,
            rightType: e.target.value,
            bottomType: e.target.value,
            leftType: e.target.value,
        })
    }

    const borderPlus = (e) => {
        setBorder({
            ...border,
            top: border.top + 1,
            right: border.top + 1,
            bottom: border.top + 1,
            left: border.top + 1,
        })
    }

    const changeBorder = (e) => {
        if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
            setBorder({
                ...border,
                top: e.target.value,
                right: e.target.value,
                bottom: e.target.value,
                left: e.target.value,
            })
    }

    const borderMinus = (e) => {
        if (border.top <= 0) return;
        setBorder({
            ...border,
            top: border.top - 1,
            right: border.top - 1,
            bottom: border.top - 1,
            left: border.top - 1,
        })
    }

    useEffect(() => {
        if (color && props.rows[props.currentRow]) {
            const rows = [...props.rows];
            rows[props.currentRow].content[props.culumnIndex].style = {
                ...rows[props.currentRow].content[props.culumnIndex].style,
                'background-color': `rgb(${color.r}, ${color.g}, ${color.b})`,
            }
            props.setRows(rows);
        }
    }, [color])

    useEffect(() => {
        const rows = [...props.rows];
        rows[props.currentRow].content[props.culumnIndex].style = {
            ...rows[props.currentRow].content[props.culumnIndex].style,
            'border-width': `${border.top}px ${border.right}px ${border.bottom}px ${border.left}px`,
            'border-style': `${border.topType} ${border.rightType} ${border.bottomType} ${border.leftType}`,
            'border-color': `rgb(${border.topColor.r}, ${border.topColor.g}, ${border.topColor.b}) rgb(${border.rightColor.r}, ${border.rightColor.g}, ${border.rightColor.b}) rgb(${border.bottomColor.r}, ${border.bottomColor.g}, ${border.bottomColor.b}) rgb(${border.leftColor.r}, ${border.leftColor.g}, ${border.leftColor.b})`
        }
        props.setRows(rows);
    }, [border])

    return (
        <>
            <div className="editor-menu-collapse-item">
                <div className="editor-menu-collapse-line">
                    <span>Фоновый цвет</span>
                    <div onClick={() => setColorActive(!colorActive)} className="editor-menu-color" style={{ 'background-color': props.rows[props.currentRow] ? props.rows[props.currentRow].content[props.culumnIndex].style['background-color'] : '' }}></div>
                    {colorActive &&
                        <div className="editor-menu-color-container">
                            <div style={{
                                position: 'fixed',
                                top: '0px',
                                right: '0px',
                                bottom: '0px',
                                left: '0px',
                            }} onClick={() => setColorActive(!colorActive)} />
                            <SketchPicker color={color} onChange={colorChange} />
                        </div>
                    }
                </div>
            </div>
            <div className="editor-menu-collapse-item">
                <div className="editor-menu-collapse-line">
                    <span>Поля TODO</span>
                </div>
            </div>
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
                        <select value={border.topType} onChange={BorderTypeSelect}>
                            <option value={'solid'}>Сплошной</option>
                            <option value={'dotted'}>Пунктирный</option>
                            <option value={'dashed'}>Шртрихованный</option>
                        </select>
                        <div className="editor-menu-collapse-block-flex">
                            <div className="editor-menu-collapse-input">
                                <button onClick={borderMinus}>-</button>
                                <input className="number" type="text" value={border.top} onChange={changeBorder} />
                                <button onClick={borderPlus}>+</button>
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
        </>
    )
}

export default EditorEmailMenuTabItem;