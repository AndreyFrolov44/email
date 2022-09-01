import React, { useState, useEffect } from "react";
import Collapsible from 'react-collapsible';
import { SketchPicker } from "react-color";

import EditorEmailMenuTab from "./EditorEmailMenuTab";
import EditorEmailMenuTabItem from "./EditorEmailMenuTabItem";
import EditorEmailMenuItemLong from "./EditorEmailMenuItemLong";

import Columns1Svg from "./../img/columns_1.svg";
import Columns2x2Svg from "./../img/columns_2x2.svg";
import Columns3x3Svg from "./../img/columns_3x3.svg";
import Columns4x4Svg from "./../img/columns_4x4.svg";
import Columns2x22575Svg from "./../img/columns_2x2-25-75.svg";
import Columns2x27525Svg from "./../img/columns_2x2-75-25.svg";
import Columns4x41633Svg from "./../img/columns_4x4-16-33.svg";
import Columns4x43316Svg from "./../img/columns_4x4-33-16.svg";
import UploadImage from "../menuComponents/UploadImage";
import ImageUrl from "../menuComponents/ImageUrl";


const EditorEmailMenuColumns = (props) => {
    const [backgroundColorActive, setBackgroundColorActive] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState({
        r: props.focusRow.style.backgroundColor ? props.focusRow.style.backgroundColor.split(")")[0].slice(4).split(", ")[0] : 255,
        g: props.focusRow.style.backgroundColor ? props.focusRow.style.backgroundColor.split(")")[0].slice(5).split(", ")[1] : 255,
        b: props.focusRow.style.backgroundColor ? props.focusRow.style.backgroundColor.split(")")[0].slice(5).split(", ")[2] : 255,
    })
    const [backgroundImage, setBackgroundImage] = useState({
        src: props.focusRow.imageSrc,
        id: props.focusRow.imageId
    })

    useEffect(() => {
        const rows = [...props.rows];
        const indexRow = rows.indexOf(props.focusRow);
        rows[indexRow].style = {
            ...rows[indexRow].style,
            backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`,
        }
        props.setRows(rows);
    }, [backgroundColor])

    useEffect(() => {
        const rows = [...props.rows];
        const indexRow = rows.indexOf(props.focusRow);
        rows[indexRow].style = {
            ...rows[indexRow].style,
            backgroundImage: `url("${backgroundImage.src}")`,
        }
        rows[indexRow].imageSrc = backgroundImage.src;
        rows[indexRow].imageId = backgroundImage.id;
        props.setRows(rows);
    }, [backgroundImage])

    useEffect(() => {
        setBackgroundColor({
            r: props.focusRow.style.backgroundColor ? props.focusRow.style.backgroundColor.split(")")[0].slice(4).split(", ")[0] : 255,
            g: props.focusRow.style.backgroundColor ? props.focusRow.style.backgroundColor.split(")")[0].slice(5).split(", ")[1] : 255,
            b: props.focusRow.style.backgroundColor ? props.focusRow.style.backgroundColor.split(")")[0].slice(5).split(", ")[2] : 255,
        })
        setBackgroundImage({
            src: props.focusRow.imageSrc,
            id: props.focusRow.imageId
        })
    }, [props.focusRow])


    return (
        <>
            <Collapsible trigger="Колонки" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <div className="editor-menu-blocks">
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '100%' }, elements: [] }]} svg={Columns1Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '50%' }, elements: [] }, { style: { width: '50%' }, elements: [] }]} svg={Columns2x2Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '33.33%' }, elements: [] }, { style: { 'width': '33.33%' }, elements: [] }, { style: { width: '33.33%' }, elements: [] }]} svg={Columns3x3Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '25%' }, elements: [] }, { style: { width: '25%' }, elements: [] }, { style: { width: '25%' }, elements: [] }, { style: { width: '25%' }, elements: [] }]} svg={Columns4x4Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '25%' }, elements: [] }, { style: { width: '75%' }, elements: [] }]} svg={Columns2x22575Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '75%' }, elements: [] }, { style: { width: '25%' }, elements: [] }]} svg={Columns2x27525Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '16.67%' }, elements: [] }, { style: { width: '33.33%' }, elements: [] }, { style: { width: '16.67%' }, elements: [] }, { style: { width: '33.33%' }, elements: [] }]} svg={Columns4x41633Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { width: '33.33%' }, elements: [] }, { style: { width: '16.67%' }, elements: [] }, { style: { width: '33.33%' }, elements: [] }, { style: { width: '16.67%' }, elements: [] }]} svg={Columns4x43316Svg} />
                </div>
            </Collapsible>
            <Collapsible trigger="Свойства колонок" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <EditorEmailMenuTab rows={props.rows} setRows={props.setRows} focusRow={props.focusRow} setFocusRow={props.setFocusRow} item={EditorEmailMenuTabItem}>
                </EditorEmailMenuTab>
            </Collapsible>
            <Collapsible trigger="Свойства строки" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <div className="editor-menu-collapse-item">
                    <div className="editor-menu-collapse-line">
                        <span>Фоновый цвет</span>
                        <div onClick={() => setBackgroundColorActive(!backgroundColorActive)} className="editor-menu-color" style={{ backgroundColor: backgroundColor ? `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})` : '' }}></div>
                        {backgroundColorActive &&
                            <div className="editor-menu-color-container">
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={() => setBackgroundColorActive(!backgroundColorActive)} />
                                <SketchPicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.rgb)} />
                            </div>
                        }
                    </div>
                </div>
                <UploadImage value={backgroundImage.src} id={backgroundImage.id} onChange={(value, id) => setBackgroundImage({ src: value, id: id })} />
                <ImageUrl value={backgroundImage.src} onChange={(value) => setBackgroundImage({ src: value, id: null })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuColumns;