import React, { useEffect, useState } from "react";
import Collapsible from 'react-collapsible';
import { SketchPicker } from 'react-color';

import ProgressBar from "../menuComponents/ProgressBar";
import LineHeight from "../menuComponents/LineHeight";
import Padding from "../menuComponents/Padding";
import Border from "../menuComponents/Border";
import BorderRadius from "../menuComponents/BorderRadius";
import Margin from "../menuComponents/Margin";
import Color from "../menuComponents/Color";
import TextAlign from "../menuComponents/TextAlign";

const EditorEmailMenuButton = (props) => {
    const [button, setButton] = useState({
        actionType: 'site',
        url: '',
        fromEmail: '',
        toEmail: '',
        contentEmail: '',
        textColor: props.focusElement.element.style.color ? {
            r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
            g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
            b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
        } : { r: 255, g: 255, b: 255 },
        backgroundColor: props.focusElement.element.style.backgroundColor ? props.focusElement.element.style.backgroundColor : {},
        width: !isNaN(parseFloat(props.focusElement.element.style.width)) ? parseInt(props.focusElement.element.style.width) : 'auto',
        textAlign: props.rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle.textAlign,
        lineHeight: !isNaN(parseInt(props.focusElement.element.style.lineHeight)) ? parseInt(props.focusElement.element.style.lineHeight) : 100,
        padding: {
            top: parseInt(props.focusElement.element.style.padding.split(" ")[0]) || 10,
            right: parseInt(props.focusElement.element.style.padding.split(" ")[1]) || 20,
            bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]) || 10,
            left: parseInt(props.focusElement.element.style.padding.split(" ")[3]) || 20
        },
        border: {
            top: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[0]) : 0,
            right: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[1]) : 0,
            bottom: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[2]) : 0,
            left: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[3]) : 0,
            topType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[0] : 'solid',
            rightType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[1] : 'solid',
            bottomType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[2] : 'solid',
            leftType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[3] : 'solid',
            topColor: props.focusElement.element.style.borderColor ? {
                r: parseInt(props.focusElement.element.style.borderColor.split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.borderColor.split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.borderColor.split(")")[0].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            rightColor: props.focusElement.element.style.borderColor ? {
                r: parseInt(props.focusElement.element.style.borderColor.split(")")[1].slice(5).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.borderColor.split(")")[1].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.borderColor.split(")")[1].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            bottomColor: props.focusElement.element.style.borderColor ? {
                r: parseInt(props.focusElement.element.style.borderColor.split(")")[2].slice(5).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.borderColor.split(")")[2].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.borderColor.split(")")[2].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            leftColor: props.focusElement.element.style.borderColor ? {
                r: parseInt(props.focusElement.element.style.borderColor.split(")")[3].slice(5).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.borderColor.split(")")[3].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.borderColor.split(")")[3].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
        },
        borderRadius: props.focusElement.element.style.borderRadius ? {
            top: parseInt(props.focusElement.element.style.borderRadius.split(" ")[0]),
            right: parseInt(props.focusElement.element.style.borderRadius.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.style.borderRadius.split(" ")[2]),
            left: parseInt(props.focusElement.element.style.borderRadius.split(" ")[3])
        } : {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        },
        margin: props.focusElement.element.style.margin ? {
            top: parseInt(props.focusElement.element.style.margin.split(" ")[0]),
            right: parseInt(props.focusElement.element.style.margin.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.style.margin.split(" ")[2]),
            left: parseInt(props.focusElement.element.style.margin.split(" ")[3])
        } : {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        }
    });
    const [colorActive, setColorActive] = useState({ color: false, background: false });
    const [buttonWidth, setButtonWidth] = useState(props.focusElement.element.style.width === 'auto' ? false : true);

    useEffect(() => {
        const rows = [...props.rows];
        console.log(props.focusElement, button)
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style,
            color: `rgb(${button.textColor.r}, ${button.textColor.g}, ${button.textColor.b})`,
            backgroundColor: button.backgroundColor,
            width: button.width !== 'auto' ? `${button.width}%` : 'auto',
            lineHeight: button.lineHeight + '%',
            padding: `${button.padding.top}px ${button.padding.right}px ${button.padding.bottom}px ${button.padding.left}px`,
            borderWidth: `${button.border.top}px ${button.border.right}px ${button.border.bottom}px ${button.border.left}px`,
            borderStyle: `${button.border.topType} ${button.border.rightType} ${button.border.bottomType} ${button.border.leftType}`,
            borderColor: `rgb(${button.border.topColor.r}, ${button.border.topColor.g}, ${button.border.topColor.b}) rgb(${button.border.rightColor.r}, ${button.border.rightColor.g}, ${button.border.rightColor.b}) rgb(${button.border.bottomColor.r}, ${button.border.bottomColor.g}, ${button.border.bottomColor.b}) rgb(${button.border.leftColor.r}, ${button.border.leftColor.g}, ${button.border.leftColor.b})`,
            borderRadius: `${button.borderRadius.top}px ${button.borderRadius.right}px ${button.borderRadius.bottom}px ${button.borderRadius.left}px`,
            margin: `${button.margin.top}px ${button.margin.right}px ${button.margin.bottom}px ${button.margin.left}px`
        }
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle,
            textAlign: button.textAlign
        }
        props.setRows(rows);
    }, [button])

    useEffect(() => {
        if (!buttonWidth) setButton({ ...button, width: 'auto' })
    }, [buttonWidth])

    useEffect(() => {
        setButton({
            actionType: 'site',
            url: '',
            fromEmail: '',
            toEmail: '',
            contentEmail: '',
            textColor: props.focusElement.element.style.color ? {
                r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
            } : { r: 255, g: 255, b: 255 },
            backgroundColor: props.focusElement.element.style.backgroundColor || {},
            width: !isNaN(parseFloat(props.focusElement.element.style.width)) ? parseInt(props.focusElement.element.style.width) : 'auto',
            textAlign: props.rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle.textAlign,
            lineHeight: !isNaN(parseInt(props.focusElement.element.style.lineHeight)) ? parseInt(props.focusElement.element.style.lineHeight) : 100,
            padding: {
                top: parseInt(props.focusElement.element.style.padding.split(" ")[0]) || 10,
                right: parseInt(props.focusElement.element.style.padding.split(" ")[1]) || 20,
                bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]) || 10,
                left: parseInt(props.focusElement.element.style.padding.split(" ")[3]) || 20
            },
            border: {
                top: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[0]) : 0,
                right: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[1]) : 0,
                bottom: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[2]) : 0,
                left: props.focusElement.element.style.borderWidth ? parseInt(props.focusElement.element.style.borderWidth.split(" ")[3]) : 0,
                topType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[0] : 'solid',
                rightType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[1] : 'solid',
                bottomType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[2] : 'solid',
                leftType: props.focusElement.element.style.borderStyle ? props.focusElement.element.style.borderStyle.split(" ")[3] : 'solid',
                topColor: props.focusElement.element.style.borderColor ? {
                    r: parseInt(props.focusElement.element.style.borderColor.split(")")[0].slice(4).split(", ")[0]),
                    g: parseInt(props.focusElement.element.style.borderColor.split(")")[0].slice(5).split(", ")[1]),
                    b: parseInt(props.focusElement.element.style.borderColor.split(")")[0].slice(5).split(", ")[2]),
                } : { r: 255, g: 255, b: 255 },
                rightColor: props.focusElement.element.style.borderColor ? {
                    r: parseInt(props.focusElement.element.style.borderColor.split(")")[1].slice(5).split(", ")[0]),
                    g: parseInt(props.focusElement.element.style.borderColor.split(")")[1].slice(5).split(", ")[1]),
                    b: parseInt(props.focusElement.element.style.borderColor.split(")")[1].slice(5).split(", ")[2]),
                } : { r: 255, g: 255, b: 255 },
                bottomColor: props.focusElement.element.style.borderColor ? {
                    r: parseInt(props.focusElement.element.style.borderColor.split(")")[2].slice(5).split(", ")[0]),
                    g: parseInt(props.focusElement.element.style.borderColor.split(")")[2].slice(5).split(", ")[1]),
                    b: parseInt(props.focusElement.element.style.borderColor.split(")")[2].slice(5).split(", ")[2]),
                } : { r: 255, g: 255, b: 255 },
                leftColor: props.focusElement.element.style.borderColor ? {
                    r: parseInt(props.focusElement.element.style.borderColor.split(")")[3].slice(5).split(", ")[0]),
                    g: parseInt(props.focusElement.element.style.borderColor.split(")")[3].slice(5).split(", ")[1]),
                    b: parseInt(props.focusElement.element.style.borderColor.split(")")[3].slice(5).split(", ")[2]),
                } : { r: 255, g: 255, b: 255 },
            },
            borderRadius: props.focusElement.element.style.borderRadius ? {
                top: parseInt(props.focusElement.element.style.borderRadius.split(" ")[0]),
                right: parseInt(props.focusElement.element.style.borderRadius.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.style.borderRadius.split(" ")[2]),
                left: parseInt(props.focusElement.element.style.borderRadius.split(" ")[3])
            } : {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            margin: props.focusElement.element.style.margin ? {
                top: parseInt(props.focusElement.element.style.margin.split(" ")[0]),
                right: parseInt(props.focusElement.element.style.margin.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.style.margin.split(" ")[2]),
                left: parseInt(props.focusElement.element.style.margin.split(" ")[3])
            } : {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            }
        })
        setButtonWidth(props.focusElement.element.style.width === 'auto' ? false : true)
    }, [props.focusElement])

    return (
        <>
            <Collapsible trigger="Действие" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <div className="editor-menu-collapse-item">
                    <div className="editor-menu-collapse-line">
                        <span>Тип действия</span>
                    </div>
                    <div className={`editor-menu-collapse-inputs active`}>
                        <div className="editor-menu-collapse-inputs-block width">
                            <select value={button.actionType} onChange={(e) => setButton({ ...button, actionType: e.target.value })} >
                                <option value={'site'}>Открыть сайт</option>
                                <option value={'mail'}>Отправить письмо</option>
                                <option value={'phone'}>Позвонить по номеру</option>
                            </select>
                            {button.actionType === 'site' &&
                                <div className="editor-menu-collapse-block">
                                    <div className="editor-menu-collapse-input">
                                        <span className="span-label">URL</span>
                                        <input className="text-span" type="text" value={button.url} onChange={(e) => setButton({ ...button, url: e.target.value })} />
                                    </div>
                                </div>
                            }
                            {button.actionType === 'mail' &&
                                <div className="editor-menu-collapse-block">
                                    <div className="editor-menu-collapse-input">
                                        <span className="span-label">Кому</span>
                                        <input className="text-span" type="text" value={button.toEmail} onChange={(e) => setButton({ ...button, toEmail: e.target.value })} />
                                    </div>
                                    <div className="editor-menu-collapse-input">
                                        <span className="span-label">Тема</span>
                                        <input className="text-span" type="text" value={button.fromEmail} onChange={(e) => setButton({ ...button, fromEmail: e.target.value })} />
                                    </div>
                                    <div className="editor-menu-collapse-input">
                                        <span className="span-label-content">Содержимое</span>
                                        <textarea className="content-span" value={button.contentEmail} onChange={(e) => setButton({ ...button, contentEmail: e.target.value })}></textarea>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Collapsible>
            <Collapsible trigger="Парметры кнопки" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Color value={button.textColor} onChange={(value) => setButton({ ...button, textColor: { ...value } })} />
                <div className="editor-menu-collapse-item">
                    <div className="editor-menu-collapse-line">
                        <span>Цвет фона</span>
                        <div onClick={() => setColorActive({ ...colorActive, background: !colorActive.background })} className="editor-menu-color" style={{ backgroundColor: button.backgroundColor }}></div>
                        {colorActive.background &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setColorActive({ ...colorActive, background: !colorActive.background })} />
                                <SketchPicker color={button.backgroundColor} onChange={(color) => setButton({ ...button, backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` })} />
                            </div>
                        }
                    </div>
                </div>
                <div className="editor-menu-collapse-item">
                    <div className="editor-menu-collapse-line">
                        <span>Автоматическая ширина</span>
                        <div className="editor-menu-collapse-checkbox">
                            <input value={buttonWidth} defaultChecked={!buttonWidth} onChange={() => setButtonWidth(!buttonWidth)} type="checkbox" />
                        </div>
                    </div>
                    {buttonWidth &&
                        <ProgressBar set={setButton} val={button} focusElement={props.focusElement} />
                    }
                </div>
                <TextAlign value={button.textAlign} onChange={(value) => setButton({ ...button, textAlign: value })} />
            </Collapsible>
            <Collapsible trigger="Интервал" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <LineHeight value={button.lineHeight} onChange={(value) => setButton({ ...button, lineHeight: value })} />
                <Padding value={button.padding} onChange={(value) => setButton({ ...button, padding: { top: value.top, right: value.right, bottom: value.bottom, left: value.left } })} />
                <Border value={button.border} onChange={(value) => setButton({ ...button, border: { ...value } })} />
                <BorderRadius value={button.borderRadius} onChange={(value) => { setButton({ ...button, borderRadius: { ...value } }) }} />
            </Collapsible>
            <Collapsible trigger="Общее" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Margin value={button.margin} onChange={(value) => setButton({ ...button, margin: { ...value } })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuButton;