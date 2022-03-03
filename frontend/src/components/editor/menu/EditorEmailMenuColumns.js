import React from "react";
import Collapsible from 'react-collapsible';

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


const EditorEmailMenuColumns = (props) => {
    return (
        <>
            <Collapsible trigger="Колонки" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <div className="editor-menu-blocks">
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '100%' }, elements: [] }]} svg={Columns1Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '50%' }, elements: [] }, { style: { 'width': '50%' }, elements: [] }]} svg={Columns2x2Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '33.33%' }, elements: [] }, { style: { 'width': '33.33%' }, elements: [] }, { style: { 'width': '33.33%' }, elements: [] }]} svg={Columns3x3Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '25%' }, elements: [] }, { style: { 'width': '25%' }, elements: [] }, { style: { 'width': '25%' }, elements: [] }, { style: { 'width': '25%' }, elements: [] }]} svg={Columns4x4Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '25%' }, elements: [] }, { style: { 'width': '75%' }, elements: [] }]} svg={Columns2x22575Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '75%' }, elements: [] }, { style: { 'width': '25%' }, elements: [] }]} svg={Columns2x27525Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '16.67%' }, elements: [] }, { style: { 'width': '33.33%' }, elements: [] }, { style: { 'width': '16.67%' }, elements: [] }, { style: { 'width': '33.33%' }, elements: [] }]} svg={Columns4x41633Svg} />
                    <EditorEmailMenuItemLong set={props.setNewColumns} columns={[{ style: { 'width': '33.33%' }, elements: [] }, { style: { 'width': '16.67%' }, elements: [] }, { style: { 'width': '33.33%' }, elements: [] }, { style: { 'width': '16.67%' }, elements: [] }]} svg={Columns4x43316Svg} />
                </div>
            </Collapsible>
            <Collapsible trigger="Свойства" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <EditorEmailMenuTab rows={props.rows} setRows={props.setRows} focusRow={props.focusRow} setFocusRow={props.setFocusRow} item={EditorEmailMenuTabItem}>
                </EditorEmailMenuTab>
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuColumns;