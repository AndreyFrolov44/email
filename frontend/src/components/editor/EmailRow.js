import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Columns from "./rowComponents/Columns";

import { ReactComponent as TrashSvg } from "./img/trash.svg";
import { ReactComponent as CopySvg } from "./img/copy.svg";


const EmailRow = observer((props) => {
    const [hover, setHover] = useState(false);
    const [counter, setCount] = useState(0);

    const addBlockPrev = (e) => {
        e.preventDefault();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row), 0, { content: [{ style: { 'width': '100%' }, elements: [] }], style: {}, id: Math.max(...props.rows.map(el => el.id)) + 1 });
        props.add(rows);
        props.setFocusRow({});
    }

    const addBlockNext = (e) => {
        e.preventDefault();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row) + 1, 0, { content: [{ style: { 'width': '100%' }, elements: [] }], style: {}, id: Math.max(...props.rows.map(el => el.id)) + 1 });
        props.add(rows);
        props.setFocusRow({});
    }

    const dragEnter = () => {
        setCount(counter + 1);
        setHover(true);
    }

    const dragLeave = () => {
        setCount(counter - 1);
        if (counter - 1 === 0) {
            setHover(false)
        }
    }

    const drop = () => {
        console.log("drop")
        setHover(false);
        setCount(0);

        let rows = [...props.rows]
        let index = props.rows.indexOf(props.row)
        rows[index] = { content: props.columns, style: {}, id: rows[index].id };
        props.add(rows);
        props.setColumns([]);
    }

    const focus = (e) => {
        if (e.target.localName !== "button") props.setFocusRow(props.row)
        props.setFocusElement({})
    }

    const deleteRow = (e) => {
        e.stopPropagation();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row), 1);
        props.add(rows);
        props.setFocusRow({});
    }

    const copyRow = (e) => {
        e.stopPropagation();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row) + 1, 0, JSON.parse(JSON.stringify({ ...props.row, style: {}, id: Math.max(...props.rows.map(el => el.id)) + 1 })));
        props.add(rows);
        props.setFocusRow({});
    }

    return (
        <div className={`editor-main-row ${props.row.content.length > 0 ? 'row-columns' : ''} row blank ${(hover || props.focusRow.id === props.row.id) && props.focusElement.id === undefined ? 'hover' : ''}`} style={props.row.style} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={drop} onClick={focus}>
            <button className="editor-button editor-button-prev" onClick={addBlockPrev}>+</button>
            {props.row.content.length === 0 ?
                <p className='text-center'> Здесь пока пусто</p>
                :
                props.row.content.map((el, i) =>
                    <Columns key={i} setFocusRow={props.setFocusRow} setHover={setHover} maxIdElement={props.maxIdElement} setMaxIdElement={props.setMaxIdElement} focusElement={props.focusElement} setFocusElement={props.setFocusElement} newElements={props.newElements} setNewElements={props.setNewElements} newColumns={props.columns} currentX={props.currentX} setCurrentX={props.setCurrentX} differentContent={props.differentContent} setDifferentContent={props.setDifferentContent} differentIndex={props.differentIndex} setDifferentIndex={props.setDifferentIndex} currentContent={props.currentContent} setCurrentContent={props.setCurrentContent} index={props.index} setIndex={props.setIndex} setCurrentRow={props.setCurrentRow} currentRow={props.currentRow} isResize={props.isResize} setIsResize={props.setIsResize} content={el} setRows={props.add} rows={props.rows} row={props.row} last={props.row.content.length === i + 1 ? true : false} />
                )
            }
            <button className="editor-button editor-button-next" onClick={addBlockNext}>+</button>
            {props.focusRow.id === props.row.id &&
                <div className="row-focus-buttons">
                    <div className="row-focus-button delete" onClick={deleteRow}><TrashSvg /></div>
                    <div className="row-focus-button" onClick={copyRow}><CopySvg /></div>
                </div>
            }
        </div >
    )
})

export default EmailRow;