import React, { useState } from "react";
import EditorEmailMenuItem from "./EditorEmailMenuItem";


import { ReactComponent as ColumnsSvg } from "./../img/columns.svg";
import { ReactComponent as ButtonSvg } from "./../img/button.svg";
import { ReactComponent as ImageSvg } from "./../img/image.svg";
import { ReactComponent as MenuSvg } from "./../img/menu.svg";
import { ReactComponent as TextSvg } from "./../img/text.svg";
import { ReactComponent as DelimiterSvg } from "./../img/delimiter.svg";
import { ReactComponent as HeaderSvg } from "./../img/header.svg";
import { ReactComponent as ContentSvg } from "./../img/content.svg";
import { ReactComponent as BlocksSvg } from "./../img/blocks.svg";

import EditorEmailMenuColumns from "./EditorEmailMenuColumns";
import EditorEmailMenuButton from "./EditorEmailMenuButton";
import EditorEmailMenuMenu from "./EditorEmailMenuMenu";
import EditorEmailMenuText from "./EditorEmailMenuText";
import Menu from './Menu';
import EditorEmailMenuDelimiter from "./EditorEmailMenuDelimiter";
import EditorEmailMenuHeader from "./EditorEmailMenuHeader";
import EditorEmailMenuImage from "./EditorEmailMenuImage";


const EditorEmailMenu = (props) => {
    const menu = () => {
        if (props.focusRow.id) return <EditorEmailMenuColumns setNewColumns={props.setNewColumns} rows={props.rows} setRows={props.setRows} focusRow={props.focusRow} setFocusRow={props.setFocusRow} />
        else if (props.focusElement.element === undefined) return
        else if (props.focusElement.element.element === 'button' && props.focusElement.element.id) return <EditorEmailMenuButton rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
        else if (props.focusElement.element.element === 'menu' && props.focusElement.element.id) return <EditorEmailMenuMenu rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
        else if (props.focusElement.element.element === 'text' && props.focusElement.element.id) return <EditorEmailMenuText rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
        else if (props.focusElement.element.element === 'delimiter' && props.focusElement.element.id) return <EditorEmailMenuDelimiter rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
        else if (props.focusElement.element.element === 'header' && props.focusElement.element.id) return <EditorEmailMenuHeader rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
        else if (props.focusElement.element.element === 'image' && props.focusElement.element.id) return <EditorEmailMenuImage rows={props.rows} setRows={props.setRows} focusElement={props.focusElement} setFocusElement={props.setFocusElement} />
    }

    return (
        <div className="editor-menu">
            <div className="editor-menu-buttons">
                <div className={`editor-menu-button ${!props.focusRow.id ? 'active' : ''}`} onClick={() => { props.setFocusRow({}); props.setFocusElement({}) }}>
                    <ContentSvg />
                    ????????????????????
                </div>
                <div className={`editor-menu-button ${props.focusRow.id ? 'active' : ''}`}>
                    <BlocksSvg />
                    ??????????
                </div>
            </div>
            <div className={`editor-menu-tab ${!props.focusRow.id && !props.focusElement.element ? 'active' : ''}`}>
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'columns'} title={'??????????????'} svg={ColumnsSvg} />
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'button'} title={'????????????'} svg={ButtonSvg} />
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'image'} title={'??????????????????????'} svg={ImageSvg} />
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'menu'} title={'????????'} svg={MenuSvg} />
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'text'} title={'??????????'} svg={TextSvg} />
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'delimiter'} title={'??????????????????????'} svg={DelimiterSvg} />
                <EditorEmailMenuItem newElements={props.newElements} setNewElements={props.setNewElements} set={props.setNewColumns} elementName={'header'} title={'??????????????????'} svg={HeaderSvg} />
            </div>
            <div className={`editor-menu-tab ${props.focusRow.id || props.focusElement.element ? 'active focus' : ''}`}>
                {menu()}
                {/* <Menu focusRow={props.focusRow} focusElement={props.focusElement} rows={props.rows} setRows={props.setRows} setNewColumns={props.setNewColumns} setFocusRow={props.setFocusRow} /> */}
            </div>
        </div >
    )
}

export default EditorEmailMenu;