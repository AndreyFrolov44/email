import React, { useState, useEffect } from "react";


const Margin = (props) => {
    const [marginDetail, setMarginDetail] = useState(props.value.top === props.value.right && props.value.top === props.value.bottom && props.value.top === props.value.left ? false : true);
    const [margin, setMargin] = useState({
        top: props.value.top,
        right: props.value.right,
        bottom: props.value.bottom,
        left: props.value.left,
    });

    useEffect(() => {
        props.onChange(margin);
    }, [margin])

    useEffect(() => {
        if (props.value.top === margin.top &&
            props.value.right === margin.right &&
            props.value.bottom === margin.bottom &&
            props.value.left === margin.left
        ) return
        setMargin({
            ...props.value
        });
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Отступы</span>
                <div className="editor-menu-collapse-checkbox">
                    <span>Все параметры</span>
                    <input value={marginDetail} onChange={() => setMarginDetail(!marginDetail)} type="checkbox" />
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${!marginDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Все стороны</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (margin.top <= 0) return;
                                setMargin({ top: margin.top - 1, right: margin.top - 1, bottom: margin.top - 1, left: margin.top - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={margin.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setMargin({ top: parseInt(e.target.value), right: e.target.value, bottom: parseInt(e.target.value), left: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setMargin({ top: margin.top + 1, right: margin.top + 1, bottom: margin.top + 1, left: margin.top + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`editor-menu-collapse-inputs ${marginDetail ? 'active' : ''}`}>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Верх</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (margin.top <= 0) return;
                                setMargin({ ...margin, top: margin.top - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={margin.top} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setMargin({ ...margin, top: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setMargin({ ...margin, top: margin.top + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Справа</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (margin.top <= 0) return;
                                setMargin({ ...margin, right: margin.right - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={margin.right} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setMargin({ ...margin, right: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setMargin({ ...margin, right: margin.right + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Слева</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (margin.left <= 0) return;
                                setMargin({ ...margin, left: margin.left - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={margin.left} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setMargin({ ...margin, left: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setMargin({ ...margin, left: margin.left + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="editor-menu-collapse-inputs-block">
                    <span>Низ</span>
                    <div className="editor-menu-collapse-block-flex">
                        <div className="editor-menu-collapse-input">
                            <button onClick={() => {
                                if (margin.bottom <= 0) return;
                                setMargin({ ...margin, bottom: margin.bottom - 1 })
                            }}>-</button>
                            <input className="number" type="text" value={margin.bottom} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value))
                                    setMargin({ ...margin, bottom: parseInt(e.target.value) });
                            }} />
                            <button onClick={() => {
                                setMargin({ ...margin, bottom: margin.bottom + 1 })
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Margin;