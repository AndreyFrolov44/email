import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";

import Line from "../menuComponents/Line";
import Padding from "../menuComponents/Padding";
import TextAlign from "../menuComponents/TextAlign";
import Width from "../menuComponents/Width";


const EditorEmailMenuDelimiter = (props) => {
    const [delimiter, setDelimiter] = useState({
        width: props.focusElement.element.style.width ? parseInt(props.focusElement.element.style.width) : 100,
        border: props.focusElement.element.style.borderTop ? {
            height: parseInt(props.focusElement.element.style.borderTop.split(" ")[0]),
            type: props.focusElement.element.style.borderTop.split(" ")[1],
            color: {
                r: parseInt(props.focusElement.element.style.borderTop.slice(props.focusElement.element.style.borderTop.indexOf('rgb(')).split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.borderTop.slice(props.focusElement.element.style.borderTop.indexOf('rgb(')).split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.borderTop.slice(props.focusElement.element.style.borderTop.indexOf('rgb(')).split(")")[0].slice(5).split(", ")[2]),
            }
        } : {
            height: 1,
            type: 'solid',
            color: {
                r: 187,
                g: 187,
                b: 187,
            }
        },
        textAlign: props.focusElement.element.columnElementStyle.textAlign || 'center',
        padding: props.focusElement.element.style.padding ? {
            top: parseInt(props.focusElement.element.style.padding.split(" ")[0]),
            right: parseInt(props.focusElement.element.style.padding.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]),
            left: parseInt(props.focusElement.element.style.padding.split(" ")[3])
        } : {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
    })

    useEffect(() => {
        const rows = [...props.rows];
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style,
            width: `${delimiter.width}%`,
            borderTop: `${delimiter.border.height}px ${delimiter.border.type} rgb(${delimiter.border.color.r}, ${delimiter.border.color.g}, ${delimiter.border.color.b})`,
        }
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle,
            padding: `${delimiter.padding.top}px ${delimiter.padding.right}px ${delimiter.padding.bottom}px ${delimiter.padding.left}px`,
            textAlign: delimiter.textAlign
        }
        props.setRows(rows);
    }, [delimiter])

    useEffect(() => {
        setDelimiter({
            color: props.focusElement.element.style.borderTop ? {
                r: parseInt(props.focusElement.element.style.borderTop.split(" ")[2].split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.borderTop.split(" ")[2].split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.borderTop.split(" ")[2].split(")")[0].slice(5).split(", ")[2]),
            } : { r: 0, g: 0, b: 0 },
            width: props.focusElement.element.style.width ? parseInt(props.focusElement.element.style.width) : 100,
            border: props.focusElement.element.style.borderTop ? {
                height: parseInt(props.focusElement.element.style.borderTop.split(" ")[0]),
                type: props.focusElement.element.style.borderTop.split(" ")[1],
                color: {
                    r: parseInt(props.focusElement.element.style.borderTop.slice(props.focusElement.element.style.borderTop.indexOf('rgb(')).split(")")[0].slice(4).split(", ")[0]),
                    g: parseInt(props.focusElement.element.style.borderTop.slice(props.focusElement.element.style.borderTop.indexOf('rgb(')).split(")")[0].slice(5).split(", ")[1]),
                    b: parseInt(props.focusElement.element.style.borderTop.slice(props.focusElement.element.style.borderTop.indexOf('rgb(')).split(")")[0].slice(5).split(", ")[2]),
                }
            } : {
                height: 1,
                type: 'solid',
                color: {
                    r: 187,
                    g: 187,
                    b: 187,
                }
            },
            textAlign: props.focusElement.element.columnElementStyle.textAlign || 'center',
            padding: props.focusElement.element.style.padding ? {
                top: parseInt(props.focusElement.element.style.padding.split(" ")[0]),
                right: parseInt(props.focusElement.element.style.padding.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]),
                left: parseInt(props.focusElement.element.style.padding.split(" ")[3])
            } : {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            },
        })
    }, [props.focusElement])

    return (
        <>
            <Collapsible trigger="Линия" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Width value={delimiter.width} onChange={(value) => setDelimiter({ ...delimiter, width: value })} focusElement={props.focusElement} />
                <Line value={delimiter.border} onChange={(value) => setDelimiter({ ...delimiter, border: { ...value } })} />
                <TextAlign value={delimiter.textAlign} onChange={(value) => setDelimiter({ ...delimiter, textAlign: value })} />
            </Collapsible>
            <Collapsible trigger="Общее" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Padding value={delimiter.padding} onChange={(value) => setDelimiter({ ...delimiter, padding: { ...value } })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuDelimiter;