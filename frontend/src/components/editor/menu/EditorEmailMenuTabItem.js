import React, { useState, useEffect } from "react";
import { SketchPicker } from 'react-color';
import Border from "../menuComponents/Border";
import Padding from "../menuComponents/Padding";


const EditorEmailMenuTabItem = (props) => {
    const [colorActive, setColorActive] = useState(false);
    const [color, setColor] = useState({
        r: props.focusRow.content[props.columnIndex].style.backgroundColor ? parseInt(props.focusRow.content[props.columnIndex].style.backgroundColor.split(")")[0].slice(4).split(", ")[0]) : undefined,
        g: props.focusRow.content[props.columnIndex].style.backgroundColor ? parseInt(props.focusRow.content[props.columnIndex].style.backgroundColor.split(")")[0].slice(5).split(", ")[1]) : undefined,
        b: props.focusRow.content[props.columnIndex].style.backgroundColor ? parseInt(props.focusRow.content[props.columnIndex].style.backgroundColor.split(")")[0].slice(5).split(", ")[2]) : undefined,
    })
    const [border, setBorder] = useState({
        top: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[0]) : 0,
        right: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[1]) : 0,
        bottom: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[2]) : 0,
        left: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[3]) : 0,
        topType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[0] : 'solid',
        rightType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[1] : 'solid',
        bottomType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[2] : 'solid',
        leftType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[3] : 'solid',
        topColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
            r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[0].slice(4).split(", ")[0]),
            g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[0].slice(5).split(", ")[1]),
            b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[0].slice(5).split(", ")[2]),
        } : { r: 255, g: 255, b: 255 },
        rightColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
            r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[1].slice(5).split(", ")[0]),
            g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[1].slice(5).split(", ")[1]),
            b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[1].slice(5).split(", ")[2]),
        } : { r: 255, g: 255, b: 255 },
        bottomColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
            r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[2].slice(5).split(", ")[0]),
            g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[2].slice(5).split(", ")[1]),
            b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[2].slice(5).split(", ")[2]),
        } : { r: 255, g: 255, b: 255 },
        leftColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
            r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[3].slice(5).split(", ")[0]),
            g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[3].slice(5).split(", ")[1]),
            b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[3].slice(5).split(", ")[2]),
        } : { r: 255, g: 255, b: 255 }
    })
    const [padding, setPadding] = useState({
        top: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[0]) : 0,
        right: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[1]) : 0,
        bottom: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[2]) : 0,
        left: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[3]) : 0
    });

    useEffect(() => {
        if (color && props.rows[props.currentRow]) {
            const rows = [...props.rows];
            rows[props.currentRow].content[props.columnIndex].style = {
                ...rows[props.currentRow].content[props.columnIndex].style,
                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            }
            props.setRows(rows);
        }
    }, [color])

    useEffect(() => {
        const rows = [...props.rows];
        rows[props.currentRow].content[props.columnIndex].style = {
            ...rows[props.currentRow].content[props.columnIndex].style,
            borderWidth: `${border.top}px ${border.right}px ${border.bottom}px ${border.left}px`,
            borderStyle: `${border.topType} ${border.rightType} ${border.bottomType} ${border.leftType}`,
            borderColor: `rgb(${border.topColor.r}, ${border.topColor.g}, ${border.topColor.b}) rgb(${border.rightColor.r}, ${border.rightColor.g}, ${border.rightColor.b}) rgb(${border.bottomColor.r}, ${border.bottomColor.g}, ${border.bottomColor.b}) rgb(${border.leftColor.r}, ${border.leftColor.g}, ${border.leftColor.b})`
        }
        props.setRows(rows);
    }, [border])

    useEffect(() => {
        const rows = [...props.rows];
        rows[props.currentRow].content[props.columnIndex].style = {
            ...rows[props.currentRow].content[props.columnIndex].style,
            padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
        }
        props.setRows(rows);
    }, [padding])

    useEffect(() => {
        setColor({
            r: props.focusRow.content[props.columnIndex].style.backgroundColor ? parseInt(props.focusRow.content[props.columnIndex].style.backgroundColor.split(")")[0].slice(4).split(", ")[0]) : undefined,
            g: props.focusRow.content[props.columnIndex].style.backgroundColor ? parseInt(props.focusRow.content[props.columnIndex].style.backgroundColor.split(")")[0].slice(5).split(", ")[1]) : undefined,
            b: props.focusRow.content[props.columnIndex].style.backgroundColor ? parseInt(props.focusRow.content[props.columnIndex].style.backgroundColor.split(")")[0].slice(5).split(", ")[2]) : undefined,
        })
        setBorder({
            top: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[0]) : 0,
            right: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[1]) : 0,
            bottom: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[2]) : 0,
            left: props.focusRow.content[props.columnIndex].style.borderWidth ? parseInt(props.focusRow.content[props.columnIndex].style.borderWidth.split(" ")[3]) : 0,
            topType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[0] : 'solid',
            rightType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[1] : 'solid',
            bottomType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[2] : 'solid',
            leftType: props.focusRow.content[props.columnIndex].style.borderStyle ? props.focusRow.content[props.columnIndex].style.borderStyle.split(" ")[3] : 'solid',
            topColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
                r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[0].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            rightColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
                r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[1].slice(5).split(", ")[0]),
                g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[1].slice(5).split(", ")[1]),
                b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[1].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            bottomColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
                r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[2].slice(5).split(", ")[0]),
                g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[2].slice(5).split(", ")[1]),
                b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[2].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            leftColor: props.focusRow.content[props.columnIndex].style.borderColor ? {
                r: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[3].slice(5).split(", ")[0]),
                g: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[3].slice(5).split(", ")[1]),
                b: parseInt(props.focusRow.content[props.columnIndex].style.borderColor.split(")")[3].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 }
        })
        setPadding({
            top: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[0]) : 0,
            right: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[1]) : 0,
            bottom: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[2]) : 0,
            left: props.focusRow.content[props.columnIndex].style.padding ? parseInt(props.focusRow.content[props.columnIndex].style.padding.split(" ")[3]) : 0
        })
        console.log(props.focusRow.content[props.columnIndex], props.columnIndex)
    }, [props.focusRow])

    return (
        <>
            <div className="editor-menu-collapse-item">
                <div className="editor-menu-collapse-line">
                    <span>Фоновый цвет</span>
                    <div onClick={() => setColorActive(!colorActive)} className="editor-menu-color" style={{ backgroundColor: `rgb(${color.r || 255}, ${color.g || 255}, ${color.b || 255})` }}></div>
                    {colorActive &&
                        <div className="editor-menu-color-container">
                            <div style={{
                                position: 'fixed',
                                top: '0px',
                                right: '0px',
                                bottom: '0px',
                                left: '0px',
                            }} onClick={() => setColorActive(!colorActive)} />
                            <SketchPicker color={color} onChange={(color) => setColor(color.rgb)} />
                        </div>
                    }
                </div>
            </div>
            {/* <div className="editor-menu-collapse-item">
                <div className="editor-menu-collapse-line">
                    <span>Поля TODO</span>
                </div>
            </div> */}
            <Padding value={padding} onChange={(value) => setPadding(value)} />

            <Border value={border} onChange={(value) => setBorder({ ...value })} />
        </>
    )
}

export default EditorEmailMenuTabItem;