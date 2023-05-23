import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import Columns from "./rowComponents/Columns";

import { ReactComponent as TrashSvg } from "./img/trash.svg";
import { ReactComponent as CopySvg } from "./img/copy.svg";
import { ReactComponent as MoveSvg } from "./img/move.svg";


const EmailRow = observer((props) => {
    const [hover, setHover] = useState(false);
    const [counter, setCount] = useState(0);
    const [dropPosition, setDropPosition] = useState();
    const rowRef = useRef();


    const addBlockPrev = (e) => {
        e.preventDefault();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row), 0, { content: [{ style: { 'width': '100%' }, elements: [] }], style: {}, id: Math.max(...props.rows.map(el => el.id)) + 1, imageSrc: '', imageId: null });
        props.add(rows);
        props.setFocusRow({});
    }

    const addBlockNext = (e) => {
        e.preventDefault();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row) + 1, 0, { content: [{ style: { 'width': '100%' }, elements: [] }], style: {}, id: Math.max(...props.rows.map(el => el.id)) + 1, imageSrc: '', imageId: null });
        props.add(rows);
        props.setFocusRow({});
    }

    const dragEnter = (e) => {
        e.preventDefault()
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setCount(counter + 1);
        setHover(true);
    }

    const dragLeave = (e) => {
        e.preventDefault()
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setCount(counter - 1);
        setDropPosition()
    }

    const drop = () => {
        let rows = [...props.rows]
        let index = props.rows.indexOf(props.row)
        setHover(false);
        setCount(0);
        setDropPosition()
        if (!props.moveRow) {
            if (props.columns.length === 0) return;

            rows[index] = { ...rows[index], content: props.columns };
            props.setColumns([]);
        }
        else {
            rows.splice(props.moveRow.indexRow, 1);
            rows.splice(dropPosition <= props.moveRow.indexRow ? dropPosition : dropPosition - 1, 0, JSON.parse(JSON.stringify({ ...props.moveRow.row })))
            props.setMoveRow();
        }
        props.add(rows);
    }

    const focus = (e) => {
        if (e.target.localName !== "button") props.setFocusRow(props.row)
        props.setFocusElement({})
    }

    const deleteRow = (e) => {
        e.stopPropagation();
        const rows = [...props.rows];
        if (rows.length == 1 && rows[0].content != []) {
            rows[0] = { content: [{ elements: [], style: { width: '100%' } }], style: {}, id: 1, imageSrc: '', imageId: null }
        }
        else rows.splice(props.rows.indexOf(props.row), 1);
        props.add(rows);
        props.setFocusRow({});
    }

    const copyRow = (e) => {
        e.stopPropagation();
        const rows = [...props.rows];
        rows.splice(props.rows.indexOf(props.row) + 1, 0, JSON.parse(JSON.stringify({ ...props.row, style: {}, id: Math.max(...props.rows.map(el => el.id)) + 1, imageSrc: '', imageId: null })));
        props.add(rows);
        props.setFocusRow({});
    }

    const moveStart = () => {
        if (props.newElements) return;
        const indexRow = props.rows.indexOf(props.row);
        props.setMoveRow({ row: { ...props.row }, indexRow: indexRow });
    }

    const dragStart = (e) => {
        if (props.newElements) {
            setDropPosition();
            return;
        }
        const indexRow = props.rows.indexOf(props.row);
        setDropPosition(e.clientY < rowRef.current.getBoundingClientRect().y + rowRef.current.getBoundingClientRect().height / 2 ? indexRow : indexRow + 1)
    }

    useEffect(() => {
        if (counter === 0) {
            setHover(false)
        }
    }, [counter])

    return (
        <tr className={`editor-main-row row row-container ${(hover || props.focusRow.id === props.row.id) || props.focusElement.id !== undefined || (props.focusElement.indexRow && props.focusElement.indexRow !== props.rows.indexOf(props.row)) ? 'hover' : ''} ${props.focusElement.indexRow === props.rows.indexOf(props.row) ? 'focus-element' : ''} ${props.id === dropPosition || props.id + 1 === dropPosition ? 'move-row' : ''}`} onDragEnter={(e) => dragEnter(e)} onDragLeaveCapture={(e) => dragLeave(e)} onDrop={drop} onDragStart={dragStart} onDragOver={dragStart} onClick={focus} ref={rowRef} style={{ ...props.row.style, width: '100%' }} >
            <table cellpadding="0" cellspacing="0" className={`row-container ${props.blankClass ? 'blank' : ''} ${props.row.content.length > 0 ? 'row-columns' : ''}`} style={{ height: props.row.content.find(column => column.elements.length > 0) ? 'auto' : '' }} >
                <button className="editor-button editor-button-prev" onClick={addBlockPrev}>+</button>
                {props.row.content.length === 0 ?
                    <p className='text-center'> Здесь пока пусто</p>
                    :
                    props.row.content.map((el, i) =>
                        <Columns key={i} setCount={setCount} moveElement={props.moveElement} setMoveElement={props.setMoveElement} focusRow={props.focusRow} setFocusRow={props.setFocusRow} setHover={setHover} maxIdElement={props.maxIdElement} setMaxIdElement={props.setMaxIdElement} focusElement={props.focusElement} setFocusElement={props.setFocusElement} newElements={props.newElements} setNewElements={props.setNewElements} newColumns={props.columns} currentX={props.currentX} setCurrentX={props.setCurrentX} differentContent={props.differentContent} setDifferentContent={props.setDifferentContent} differentIndex={props.differentIndex} setDifferentIndex={props.setDifferentIndex} currentContent={props.currentContent} setCurrentContent={props.setCurrentContent} index={props.index} setIndex={props.setIndex} setCurrentRow={props.setCurrentRow} currentRow={props.currentRow} isResize={props.isResize} setIsResize={props.setIsResize} content={el} setRows={props.add} rows={props.rows} row={props.row} last={props.row.content.length === i + 1 ? true : false} />
                    )
                }
                <button className="editor-button editor-button-next" onClick={addBlockNext}>+</button>
                {props.focusRow.id === props.row.id &&
                    <div className="row-focus-buttons">
                        <div className="row-focus-button delete" onClick={deleteRow}><TrashSvg /></div>
                        <div className="row-focus-button" onClick={copyRow}><CopySvg /></div>
                    </div>
                }
            </table>
            {props.id === dropPosition && !props.moveElement &&
                <div className="row-column-drop" />
            }
            {props.id + 1 === dropPosition && !props.moveElement &&
                <div className="row-column-drop-last" />
            }
            {props.focusRow.id === props.row.id &&
                <div className="row-move button-move" draggable={true} onDragStart={moveStart} ><MoveSvg /></div>
            }
        </tr >
    )
})

export default EmailRow;