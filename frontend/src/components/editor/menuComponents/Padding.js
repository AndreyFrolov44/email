import React, { useState, useEffect } from "react";


const Padding = (props) => {
    const [paddingDetail, setPaddingDetail] = useState(props.value.top === props.value.right && props.value.top === props.value.bottom && props.value.top === props.value.left ? false : true)
    const [padding, setPadding] = useState({
        top: props.value.top,
        right: props.value.right,
        bottom: props.value.bottom,
        left: props.value.left
    })

    useEffect(() => {
        props.onChange(padding);
    }, [padding])

    useEffect(() => {
        if (props.value.top === padding.top && props.value.right === padding.right && props.value.bottom === padding.bottom && props.value.left === padding.left) return
        setPadding({
            ...props.value
        });
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Поля</span>
                <div className="editor-menu-collapse-checkbox">
                    <span>Все параметры</span>
                    <input defaultChecked={paddingDetail} value={paddingDetail} onChange={() => setPaddingDetail(!paddingDetail)} type="checkbox" />
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${!paddingDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Все стороны</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (padding.top <= 0) return;
                                setPadding({ top: padding.top - 1, right: padding.top - 1, bottom: padding.top - 1, left: padding.top - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={padding.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setPadding({ top: parseInt(e.target.value), right: e.target.value, bottom: parseInt(e.target.value), left: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setPadding({ top: padding.top + 1, right: padding.top + 1, bottom: padding.top + 1, left: padding.top + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${paddingDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Верх</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (padding.top <= 0) return;
                                setPadding({ ...padding, top: padding.top - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={padding.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setPadding({ ...padding, top: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setPadding({ ...padding, top: padding.top + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Справа</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (padding.top <= 0) return;
                                setPadding({ ...padding, right: padding.right - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={padding.right} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setPadding({ ...padding, right: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setPadding({ ...padding, right: padding.right + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Слева</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (padding.left <= 0) return;
                                setPadding({ ...padding, left: padding.left - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={padding.left} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setPadding({ ...padding, left: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setPadding({ ...padding, left: padding.left + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Низ</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (padding.bottom <= 0) return;
                                setPadding({ ...padding, bottom: padding.bottom - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={padding.bottom} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setPadding({ ...padding, bottom: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setPadding({ ...padding, bottom: padding.bottom + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Padding;