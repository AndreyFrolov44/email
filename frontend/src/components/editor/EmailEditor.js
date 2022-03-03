import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import EmailRow from "./EmailRow";

import "./scss/editor.scss";
import EditorEmailMenu from "./menu/EditorEmailMenu";


const EmailEditor = observer(() => {
    const [row, setRow] = useState([{ content: [{ elements: [], style: { 'width': '100%' } }], style: {}, id: 1 }]);
    const [newColumns, setNewColumns] = useState([]);
    const [newElements, setNewElements] = useState();
    const [isResize, setIsResize] = useState(false);
    const [focusRow, setFocusRow] = useState({});
    const [focusElement, setFocusElement] = useState({});
    const [maxIdElement, setMaxIdElement] = useState(1);

    const [currentRow, setCurrentRow] = useState({});
    const [currentX, setCurrentX] = useState({});
    const [currentContent, setCurrentContent] = useState({});
    const [differentContent, setDifferentContent] = useState({});
    const [index, setIndex] = useState(-1);
    const [differentIndex, setDifferentIndex] = useState(-1);

    const drop = (e) => {
        e.preventDefault();
    }

    const resize = (e) => {
        if (isResize && currentContent.style && currentX.old !== e.clientX) {
            setCurrentX({ old: currentX.new, new: e.clientX });
        }
    }

    const mouseUp = () => {
        setIsResize(false)
        setCurrentContent({})
        setDifferentContent({})
        setIndex(-1);
        setDifferentIndex(-1)
    }

    useEffect(() => {
        if (isResize && currentContent.style) {
            if ((parseFloat(currentContent.style.width) < 10.0 && currentX.old > currentX.new) || (parseFloat(differentContent.style.width) < 10.0 && currentX.old < currentX.new) || currentX.old === currentX.new) return
            setCurrentContent({ elements: currentRow.content[index].elements, style: { ...currentContent.style, width: currentX.old > currentX.new ? parseFloat(currentContent.style.width) - 0.4 + '%' : parseFloat(currentContent.style.width) + 0.4 + '%' } });
            setDifferentContent({ elements: currentRow.content[differentIndex].elements, style: { ...differentContent.style, width: currentX.old > currentX.new ? parseFloat(differentContent.style.width) + 0.4 + '%' : parseFloat(differentContent.style.width) - 0.4 + '%' } });

            setRow(row.map(el => {
                if (el.id === currentRow.id) {
                    return {
                        ...el, content: el.content.map((content, i) => {
                            if (i === index) return currentContent
                            else if (i === differentIndex) return differentContent;
                            return content;
                        })
                    }
                }
                return el;
            }))
        }
    }, [currentX])

    useEffect(() => {
        // setRow([{ content: [{ style: { 'width': '100%' } }], id: 1 }])
    }, [null])

    useEffect(() => {
        if (currentRow.content && index > -1) {
            setCurrentContent(currentRow.content[index]);
            setDifferentIndex(currentRow.content[index + 1] ? index + 1 : index - 1)
        }
    }, [index])

    useEffect(() => {
        if (currentRow.content) {
            setDifferentContent(currentRow.content[differentIndex]);
        }
    }, [differentIndex])

    useEffect(() => {
        if (focusRow.id && newColumns.length > 0) {
            let rows = [...row]
            let index = row.indexOf(focusRow)
            rows[index] = { content: newColumns, style: {}, id: rows[index].id };
            setRow(rows);
            setFocusRow(rows[index]);
            setNewColumns([])
        }
    }, [newColumns])

    useEffect(() => {
        // console.log(row)
    }, [row])

    useEffect(() => {
        // console.log(focusElement)
    }, [focusElement])

    return (
        <div className="editor" onMouseMove={(e) => resize(e)} onMouseUp={mouseUp}>
            <div className="editor-main" onDragOver={drop}>
                {row.map((el, i) =>
                    <EmailRow maxIdElement={maxIdElement} setMaxIdElement={setMaxIdElement} focusElement={focusElement} setFocusElement={setFocusElement} newElements={newElements} setNewElements={setNewElements} focusRow={focusRow} setFocusRow={setFocusRow} currentX={currentX} setCurrentX={setCurrentX} differentContent={differentContent} setDifferentContent={setDifferentContent} differentIndex={differentIndex} setDifferentIndex={setDifferentIndex} currentContent={currentContent} setCurrentContent={setCurrentContent} index={index} setIndex={setIndex} key={i} isResize={isResize} setIsResize={setIsResize} rows={row} setCurrentRow={setCurrentRow} currentRow={currentRow} add={setRow} columns={newColumns} setColumns={setNewColumns} id={i} row={el} />
                )}
            </div>
            <EditorEmailMenu focusElement={focusElement} setFocusElement={setFocusElement} newElements={newElements} setNewElements={setNewElements} rows={row} setRows={setRow} focusRow={focusRow} setFocusRow={setFocusRow} setNewColumns={setNewColumns} />
        </div>
    )
})

export default EmailEditor;