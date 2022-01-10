import React from "react";
import { observer } from "mobx-react-lite";

const Popup = observer((props) => {
    return (
        <>
            <div style={{ 'max-width': props.width }} className="popup">
                {props.hide &&
                    <span className="popup-close" onClick={() => {
                        if (props.hide) props.click(false)
                    }}></span>
                }
                {props.children}
            </div>
            <div className="popup-shadow" onClick={() => {
                if (props.hide) props.click(false)
            }}></div>
        </>
    )
})

export default Popup;