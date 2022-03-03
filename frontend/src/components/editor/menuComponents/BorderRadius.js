import React, { useState, useEffect } from "react";


const BorderRadius = (props) => {
    const [borderDetail, setBorderDetail] = useState(false);
    const [border, setBorder] = useState({
        top: props.value.top,
        right: props.value.right,
        bottom: props.value.bottom,
        left: props.value.left
    });

    useEffect(() => {
        props.onChange(border);
    }, [border])

    useEffect(() => {
        if (props.value.top === border.top &&
            props.value.right === border.right &&
            props.value.bottom === border.bottom &&
            props.value.left === border.left
        ) return
        setBorder({
            ...props.value
        });
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Закругления</span>
                <div className="editor-menu-collapse-checkbox">
                    <span>Все параметры</span>
                    <input value={borderDetail} onChange={() => setBorderDetail(!borderDetail)} type="checkbox" />
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${!borderDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Все стороны</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.top <= 0) return;
                                setBorder({ top: border.top - 1, right: border.top - 1, bottom: border.top - 1, left: border.top - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={border.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ top: parseInt(e.target.value), right: e.target.value, bottom: parseInt(e.target.value), left: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setBorder({ top: border.top + 1, right: border.top + 1, bottom: border.top + 1, left: border.top + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${borderDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Верх</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.top <= 0) return;
                                setBorder({ ...border, top: border.top - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={border.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, top: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setBorder({ ...border, top: border.top + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Справа</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.top <= 0) return;
                                setBorder({ ...border, right: border.right - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={border.right} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, right: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setBorder({ ...border, right: border.right + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Слева</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.left <= 0) return;
                                setBorder({ ...border, left: border.left - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={border.left} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, left: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setBorder({ ...border, left: border.left + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Низ</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (border.bottom <= 0) return;
                                setBorder({ ...border, bottom: border.bottom - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={border.bottom} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setBorder({ ...border, bottom: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setBorder({ ...border, bottom: border.bottom + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BorderRadius;