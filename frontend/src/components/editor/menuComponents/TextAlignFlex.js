import React, { useState, useEffect } from "react";

import { ReactComponent as AlignLeftSvg } from "./../img/alignLeft.svg";
import { ReactComponent as AlignCenterSvg } from "./../img/alignCenter.svg";
import { ReactComponent as AlignRightSvg } from "./../img/alignRight.svg";
import { ReactComponent as AlignWidthSvg } from "./../img/alignWidth.svg";


const TextAlignFlex = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onChange(value);
    }, [value])

    useEffect(() => {
        if (value === props.value) return
        setValue(props.value)
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Центрирование</span>
                <div className="editor-menu-collapse-flex">
                    <span className={`editor-menu-collapse-align ${value === 'flex-start' ? 'active' : ''}`} onClick={() => setValue('flex-start')}><AlignLeftSvg /></span>
                    <span className={`editor-menu-collapse-align ${value === 'center' ? 'active' : ''}`} onClick={() => setValue('center')}><AlignCenterSvg /></span>
                    <span className={`editor-menu-collapse-align ${value === 'flex-end' ? 'active' : ''}`} onClick={() => setValue('flex-end')}><AlignRightSvg /></span>
                    <span className={`editor-menu-collapse-align ${value === 'space-between' ? 'active' : ''}`} onClick={() => setValue('space-between')}><AlignWidthSvg /></span>
                </div>
            </div>
        </div>
    )
}

export default TextAlignFlex;