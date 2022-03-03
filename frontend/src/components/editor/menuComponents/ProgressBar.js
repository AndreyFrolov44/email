import React, { useEffect, useState } from "react";


const ProgressBar = (props) => {
    const [width, setWidth] = useState(props.val.width === 'auto' ? 100 : props.val.width);
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
        props.set({ ...props.val, width: width })
    }, [width])

    useEffect(() => {
        setWidth(props.focusElement.element.style.width === 'auto' ? 100 : parseInt(props.focusElement.element.style.width))
    }, [props.focusElement])

    return (
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
    )
}

export default ProgressBar;