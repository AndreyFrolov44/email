import React, { useState, useEffect } from "react";
import Collapsible from 'react-collapsible';
import Color from "../menuComponents/Color";
import LineHeight from "../menuComponents/LineHeight";
import TextAlign from "../menuComponents/TextAlign";
import Margin from "../menuComponents/Margin";


const EditorEmailMenuText = (props) => {
    const [text, setText] = useState({
        color: props.focusElement.element.style.color ? {
            r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
            g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
            b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
        } : { r: 0, g: 0, b: 0 },
        lineHeight: props.focusElement.element.style.lineHeight ? parseInt(props.focusElement.element.style.lineHeight) : 140,
        textAlign: props.focusElement.element.columnElementStyle.textAlign || 'left',
        margin: props.focusElement.element.style.margin ? {
            top: parseInt(props.focusElement.element.style.margin.split(" ")[0]),
            right: parseInt(props.focusElement.element.style.margin.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.style.margin.split(" ")[2]),
            left: parseInt(props.focusElement.element.style.margin.split(" ")[3])
        } : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    })

    useEffect(() => {
        const rows = [...props.rows];
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style,
            color: `rgb(${text.color.r}, ${text.color.g}, ${text.color.b})`,
            lineHeight: `${text.lineHeight}%`,
            margin: `${text.margin.top}px ${text.margin.right}px ${text.margin.bottom}px ${text.margin.left}px`
        }
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle,
            textAlign: text.textAlign,
        }
        props.setRows(rows);
    }, [text])

    useEffect(() => {
        setText({
            color: props.focusElement.element.style.color ? {
                r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
            } : { r: 0, g: 0, b: 0 },
            lineHeight: props.focusElement.element.style.lineHeight ? parseInt(props.focusElement.element.style.lineHeight) : 140,
            textAlign: props.focusElement.element.columnElementStyle.textAlign || 'left',
            margin: props.focusElement.element.style.margin ? {
                top: parseInt(props.focusElement.element.style.margin.split(" ")[0]),
                right: parseInt(props.focusElement.element.style.margin.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.style.margin.split(" ")[2]),
                left: parseInt(props.focusElement.element.style.margin.split(" ")[3])
            } : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        })
    }, [props.focusElement])

    return (
        <>
            <Collapsible trigger="Текст" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Color value={text.color} onChange={(value) => setText({ ...text, color: { ...value } })} />
                <TextAlign value={text.textAlign} onChange={(value) => setText({ ...text, textAlign: value })} />
                <LineHeight value={text.lineHeight} onChange={(value) => setText({ ...text, lineHeight: value })} />
            </Collapsible>
            <Collapsible trigger="Общее" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Margin value={text.margin} onChange={(value) => setText({ ...text, margin: value })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuText;