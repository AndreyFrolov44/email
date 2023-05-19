import React, { useState, useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router";

import EmailRow from "./EmailRow";
import "./scss/editor.scss";
import EditorEmailMenu from "./menu/EditorEmailMenu";
import Popup from "../popup/Popup";
import { Context } from "../..";
import { TEMPLATES_ROUTE } from "../../utils/consts";


const EmailEditor = observer((props) => {
    const [templateName, setTemaplateName] = useState('');
    const [row, setRow] = useState([{ content: [{ elements: [], style: { width: '100%' } }], style: {}, id: 1, imageSrc: '', imageId: null }]);
    const [newColumns, setNewColumns] = useState([]);
    const [newElements, setNewElements] = useState();
    const [isResize, setIsResize] = useState(false);
    const [focusRow, setFocusRow] = useState({});
    const [focusElement, setFocusElement] = useState({});
    const [maxIdElement, setMaxIdElement] = useState(1);
    const [moveElement, setMoveElement] = useState();
    const [moveRow, setMoveRow] = useState();

    const [currentRow, setCurrentRow] = useState({});
    const [currentX, setCurrentX] = useState({});
    const [currentContent, setCurrentContent] = useState({});
    const [differentContent, setDifferentContent] = useState({});
    const [index, setIndex] = useState(-1);
    const [differentIndex, setDifferentIndex] = useState(-1);

    const templateRef = useRef();
    const [blankClass, setBlankClass] = useState(true);

    const [savePopup, setSavePopup] = useState(false);

    const { templates } = useContext(Context);

    let navigate = useNavigate();

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

    const saveTemplateClick = (e) => {
        e.preventDefault();
        setBlankClass(false);
    }

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    useEffect(() => {
        if (!blankClass) {
            html2canvas(templateRef.current, {
                useCORS: true,
                allowTaint: true,
                proxy: "https://cors-anywhere.herokuapp.com/"
            }).then((canvas) => {
                let formData = new FormData();

                const image = canvas.toDataURL("image/png", 1.0);
                var file = dataURLtoFile(image, `${templateName}.png`);
                formData.append('img', file);
                formData.append('name', templateName);
                formData.append('html', templateRef.current.outerHTML);
                formData.append('rows', JSON.stringify(row));
                if (props.rows) templates.updateTemplate(props.id, formData);
                else templates.createTemplate(formData);

                navigate(TEMPLATES_ROUTE);
            })
            setBlankClass(true)
        }
    }, [blankClass])

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
            rows[index] = { ...rows[index], content: newColumns };
            setRow(rows);
            setFocusRow(rows[index]);
            setNewColumns([])
        }
    }, [newColumns])

    useEffect(() => {
        if (props.rows) {
            setRow(JSON.parse(props.rows))
        }
    }, [props.rows])

    useEffect(() => {
        if (props.name) {
            setTemaplateName(props.name)
        }
    }, [props.name])

    useEffect(() => {
        console.log(row)
    }, [row])

    return (
        <>
            <div className="editor-header">
                <h2>{templateName || 'Без названия'}</h2>
                <button className="button" onClick={() => {
                    setSavePopup(true);
                    setFocusElement({});
                    setFocusRow({})
                }}>Сохранить</button>
            </div>
            <div className="editor" onMouseMove={(e) => resize(e)} onMouseUp={mouseUp}>
                <table border="0" cellpadding="0" cellspacing="0" className="editor-main editor-table-main" onDragOver={drop} id="capture" ref={templateRef} >
                    {row.map((el, i) =>
                        <EmailRow blankClass={blankClass} moveRow={moveRow} setMoveRow={setMoveRow} moveElement={moveElement} setMoveElement={setMoveElement} maxIdElement={maxIdElement} setMaxIdElement={setMaxIdElement} focusElement={focusElement} setFocusElement={setFocusElement} newElements={newElements} setNewElements={setNewElements} focusRow={focusRow} setFocusRow={setFocusRow} currentX={currentX} setCurrentX={setCurrentX} differentContent={differentContent} setDifferentContent={setDifferentContent} differentIndex={differentIndex} setDifferentIndex={setDifferentIndex} currentContent={currentContent} setCurrentContent={setCurrentContent} index={index} setIndex={setIndex} key={i} isResize={isResize} setIsResize={setIsResize} rows={row} setCurrentRow={setCurrentRow} currentRow={currentRow} add={setRow} columns={newColumns} setColumns={setNewColumns} id={i} row={el} />
                    )}
                </table>
                <EditorEmailMenu focusElement={focusElement} setFocusElement={setFocusElement} newElements={newElements} setNewElements={setNewElements} rows={row} setRows={setRow} focusRow={focusRow} setFocusRow={setFocusRow} setNewColumns={setNewColumns} />
            </div>
            {savePopup &&
                <Popup hide={true} click={setSavePopup}>
                    <h2>Введите название шаблона</h2>
                    <input value={templateName} onChange={(e) => setTemaplateName(e.target.value)} />
                    <button className="button" onClick={(e) => { saveTemplateClick(e) }}>Сохранить</button>
                </Popup>
            }
        </>
    )
})

export default EmailEditor;