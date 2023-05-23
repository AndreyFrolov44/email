import React, { useState, useEffect } from "react";

const WidthAuto = (props) => {
    const [widthDetail, setWidthDetail] = useState(props.value === 'auto' ? false : true);
    const [width, setWidth] = useState(props.value ? 100 : parseInt(props.value));

    const [isMove, setIsMove] = useState(false);
    const [xCoord, setXCoord] = useState({ new: 0, old: 0 })

    const move = (e) => {
        if (!isMove) return;
        setXCoord({ old: xCoord.new, new: e.clientX })
    }

    const click = (e) => {
        setIsMove(true);
        setXCoord({ old: e.clientX, new: e.clientX })
    }

    useEffect(() => {
        if (!isMove || xCoord.old === xCoord.new || (width >= 100 && xCoord.old < xCoord.new) || (width <= 0 && xCoord.old > xCoord.new)) return;
        setWidth(xCoord.old > xCoord.new ? width - 1 : width + 1);
    }, [xCoord])

    useEffect(() => {
        props.onChange(width);
    }, [width])

    useEffect(() => {
        setWidth(props.value === 'auto' ? 100 : parseInt(props.value))
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Автоматическая ширина</span>
                <div className="editor-menu-collapse-checkbox">
                    <input value={widthDetail} defaultChecked={!widthDetail} onChange={() => setWidthDetail(!widthDetail)} type="checkbox" />
                </div>
            </div>
            {widthDetail &&
                <div className="progress" onMouseUp={() => setIsMove(false)} draggable={false} >
                    {isMove &&
                        <div style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                        }} draggable={false} onMouseMove={move} onMouseUp={() => setIsMove(false)} />
                    }
                    <div draggable={false} className="progress-background">
                        <div className="progress-line" draggable={false} style={{ width: `${width}%` }}>
                            <div onMouseDown={click} className="progress-line-circle" draggable={false}></div>
                        </div>
                    </div>
                    <span>{width}%</span>
                </div>
            }
        </div>
    )
}

export default WidthAuto;