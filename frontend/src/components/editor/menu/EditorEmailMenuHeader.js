import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import FontSize from "../menuComponents/FontSize";
import HeaderType from "../menuComponents/HeadreType";
import Color from "../menuComponents/Color";
import TextAlign from "../menuComponents/TextAlign";
import LineHeight from "../menuComponents/LineHeight";
import Margin from "../menuComponents/Margin";


const EditorEmailMenuHeader = (props) => {
    const [header, setHeader] = useState({
        fontSize: props.focusElement.element.style.fontSize ? parseInt(props.focusElement.element.style.fontSize) : 22,
        type: props.focusElement.element.type || "h1",
        color: props.focusElement.element.style.color ? {
            r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
            g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
            b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
        } : { r: 0, g: 0, b: 0 },
        textAlign: props.focusElement.element.columnElementStyle.textAlign || 'left',
        lineHeight: props.focusElement.element.style.lineHeight ? parseInt(props.focusElement.element.style.lineHeight) : 140,
        padding: props.focusElement.element.style.padding ? {
            top: parseInt(props.focusElement.element.style.padding.split(" ")[0]),
            right: parseInt(props.focusElement.element.style.padding.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]),
            left: parseInt(props.focusElement.element.style.padding.split(" ")[3])
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
            fontSize: `${header.fontSize}px`,
            color: `rgb(${header.color.r}, ${header.color.g}, ${header.color.b})`,
            lineHeight: `${header.lineHeight}%`,
            padding: `${header.padding.top}px ${header.padding.right}px ${header.padding.bottom}px ${header.padding.left}px`
        }

        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle,
            textAlign: header.textAlign,
        }

        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].type = header.type;
        props.setRows(rows);
    }, [header])

    useEffect(() => {
        setHeader({
            fontSize: props.focusElement.element.style.fontSize ? parseInt(props.focusElement.element.style.fontSize) : 22,
            type: props.focusElement.element.type || "h1",
            color: props.focusElement.element.style.color ? {
                r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
            } : { r: 0, g: 0, b: 0 },
            textAlign: props.focusElement.element.columnElementStyle.textAlign || 'left',
            lineHeight: props.focusElement.element.style.lineHeight ? parseInt(props.focusElement.element.style.lineHeight) : 140,
            padding: props.focusElement.element.style.padding ? {
                top: parseInt(props.focusElement.element.style.padding.split(" ")[0]),
                right: parseInt(props.focusElement.element.style.padding.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]),
                left: parseInt(props.focusElement.element.style.padding.split(" ")[3])
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
                <HeaderType value={header.fontSize} onChange={(value, type) => setHeader({ ...header, fontSize: value, type: type })} type={header.type} />
                <FontSize value={header.fontSize} onChange={(value) => setHeader({ ...header, fontSize: value })} />
                <Color value={header.color} onChange={(value) => setHeader({ ...header, color: { ...value } })} />
                <TextAlign value={header.textAlign} onChange={(value) => setHeader({ ...header, textAlign: value })} />
                <LineHeight value={header.lineHeight} onChange={(value) => setHeader({ ...header, lineHeight: value })} />
            </Collapsible>
            <Collapsible trigger="Общее" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Margin value={header.padding} onChange={(value) => setHeader({ ...header, padding: value })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuHeader;