import React, { useEffect, useState, useRef } from "react";

import Menu from "../rowComponents/Menu";
import Button from "./Button";
import Delimiter from "./Delimiter";
import Header from "./Header";
import Text from "./Text";
import Image from "./Image";

import { ReactComponent as TrashSvg } from "./../img/trash.svg";
import { ReactComponent as CopySvg } from "./../img/copy.svg";
import { ReactComponent as MoveSvg } from "./../img/move.svg";


const Columns = (props) => {
    const elementsRef = useRef();
    const [dropPosition, setDropPosition] = useState(null);


    const downResize = (e) => {
        props.setCurrentX({ old: e.clientX, new: e.clientX })
        props.setIsResize(true)

        props.setCurrentRow(props.row)
        props.setIndex(props.row.content.indexOf(props.content));
    }

    const drop = (e) => {
        if (props.newColumns.length !== 0) return;
        // e.stopPropagation();
        props.setHover(false);

        const indexRow = props.rows.indexOf(props.row);
        const rows = [...props.rows];
        const indexColumn = rows[indexRow].content.indexOf(props.content);

        setDropPosition(null);
        if (!props.moveElement && props.newElements) {
            if (props.newElements === "button") {
                rows[indexRow].content[indexColumn].elements.splice(dropPosition, 0, {
                    element: props.newElements,
                    text: 'Текст кнопки',
                    style: {
                        padding: '10px 20px 10px 20px',
                        backgroundColor: '#8c8cff',
                        borderRadius: '5px 5px 5px 5px',
                        display: 'inline-block',
                        margin: '20px 0 20px 0',
                        color: 'rgb(255, 255, 255)',
                        width: 'auto',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        cursor: 'pointer',
                        lineHeight: '100%',
                        // borderWidth: '0px',
                        // borderStyle: 'solid',
                        fontSize: '15px',
                        // borderColor: 'rgb(255, 255, 255)',
                    },
                    id: props.maxIdElement,
                    columnElementStyle: {
                        textAlign: 'center'
                    },
                    actionType: 'site',
                    url: '',
                    subjectEmail: '',
                    toEmail: '',
                    contentEmail: '',
                    phone: ''
                })
            } else if (props.newElements === "menu") {
                rows[indexRow].content[indexColumn].elements.splice(dropPosition, 0, {
                    element: props.newElements,
                    items: [
                        {
                            text: 'Элемент 1',
                            actionType: 'site',
                            url: '',
                            subjectEmail: '',
                            toEmail: '',
                            contentEmail: '',
                            phone: ''
                        },
                        {
                            text: 'Элемент 2',
                            actionType: 'site',
                            url: '',
                            subjectEmail: '',
                            toEmail: '',
                            contentEmail: '',
                            phone: ''
                        },
                        {
                            text: 'Элемент 3',
                            actionType: 'site',
                            url: '',
                            subjectEmail: '',
                            toEmail: '',
                            contentEmail: '',
                            phone: ''
                        },
                    ],
                    style: {
                        display: 'inline-block',
                        color: 'rgb(0, 0, 0)',
                        margin: '0 20px 0 0'
                    },
                    listStyle: {
                        padding: '10px 20px 10px 20px',
                        fontSize: '15px',
                        textAlign: 'center'
                        // display: 'flex',
                        // justifyContent: 'center',
                        // flexDirection: 'row',
                        // flexWrap: 'wrap'
                    },
                    itemStyle: {
                        display: 'inline-block'
                    },
                    id: props.maxIdElement,
                });
            } else if (props.newElements === "text") {
                rows[indexRow].content[indexColumn].elements.splice(dropPosition, 0, {
                    element: props.newElements,
                    text: 'Это новый текстовый элемент. Вы можете изменить содержимое',
                    style: {
                        display: 'inline-block',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '16px',
                        maxWidth: '100%'
                    },
                    columnElementStyle: {
                        textAlign: 'left'
                    },
                    id: props.maxIdElement,
                });
            } else if (props.newElements === "delimiter") {
                rows[indexRow].content[indexColumn].elements.splice(dropPosition, 0, {
                    element: props.newElements,
                    style: {
                        borderTop: "1px solid rgb(187, 187, 187)",
                        width: "100%",
                        display: "inline-block",
                        verticalAlign: "middle",
                    },
                    columnElementStyle: {
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center'
                    },
                    id: props.maxIdElement,
                });
            } else if (props.newElements === "header") {
                rows[indexRow].content[indexColumn].elements.splice(dropPosition, 0, {
                    element: props.newElements,
                    text: 'Заголовок',
                    type: "h1",
                    style: {
                        // display: "inline-block",
                        fontWeight: "bold",
                        fontSize: "22px",
                        lineHeight: "140%",
                        padding: "10px 10px 10px 10px",
                        boxSizing: 'border-box'
                    },
                    columnElementStyle: {
                        textAlign: 'left'
                    },
                    id: props.maxIdElement,
                });
            }
            else if (props.newElements === "image") {
                rows[indexRow].content[indexColumn].elements.splice(dropPosition, 0, {
                    element: props.newElements,
                    src: 'https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300',
                    imageId: null,
                    alt: 'Альтернативный текст',
                    style: {
                        display: "inline-block",
                        width: '100%',
                        boxSizing: 'border-box'
                    },
                    columnElementStyle: {
                        textAlign: 'left'
                    },
                    id: props.maxIdElement,
                });
            }
            rows[indexRow].style = { ...rows[indexRow].style, height: 'auto' }
            props.setMaxIdElement(props.maxIdElement + 1);
            props.setCount(0)
        }
        else {
            rows[props.moveElement.indexRow].content[props.moveElement.indexColumn].elements.splice(props.moveElement.indexElement, 1);
            rows[indexRow].content[indexColumn].elements.splice(dropPosition <= props.moveElement.indexElement || props.moveElement.indexColumn !== indexColumn || props.moveElement.indexRow !== indexRow ? dropPosition : dropPosition - 1, 0, JSON.parse(JSON.stringify({ ...props.moveElement.element })))
            props.setMoveElement();
        }
        props.setRows(rows);
        props.setNewElements();
    }

    const focus = (e, element) => {
        e.stopPropagation();
        const indexRow = props.rows.indexOf(props.row);
        const columnIndex = props.rows[indexRow].content.indexOf(props.content);
        props.setFocusElement({ element: { ...element }, indexRow: indexRow, columnIndex: columnIndex, elementIndex: props.rows[indexRow].content[columnIndex].elements.indexOf(element) });
        props.setFocusRow({});
    }

    const getElementComponent = (element) => {
        if (element.element === 'button') return <Button element={element} setRows={props.setRows} rows={props.rows} row={props.row} content={props.content} />;
        else if (element.element === 'menu') return <Menu element={element} />
        else if (element.element === 'text') return <Text element={element} setRows={props.setRows} rows={props.rows} row={props.row} content={props.content} />
        else if (element.element === 'delimiter') return <Delimiter element={element} />
        else if (element.element === 'header') return <Header element={element} setRows={props.setRows} rows={props.rows} row={props.row} content={props.content} />
        else if (element.element === 'image') return <Image element={element} />
    }

    const dragStart = (e, element) => {
        // e.preventDefault();
        // e.stopPropagation();
        const indexRow = props.rows.indexOf(props.row);
        const indexColumn = props.rows[indexRow].content.indexOf(props.content);
        const indexElement = props.rows[indexRow].content[indexColumn].elements.indexOf(element)
        setDropPosition(e.clientY < elementsRef.current.childNodes[indexElement].getBoundingClientRect().y + elementsRef.current.childNodes[indexElement].getBoundingClientRect().height / 2 ? indexElement : indexElement + 1)
    }

    const dragLeave = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        console.log("leave")
        setDropPosition(null);
    }

    const deleteButton = (e, el) => {
        e.stopPropagation();

        const indexRow = props.rows.indexOf(props.row);
        const rows = [...props.rows];
        const indexColumn = rows[indexRow].content.indexOf(props.content);
        rows[indexRow].content[indexColumn].elements.splice(rows[indexRow].content[indexColumn].elements.indexOf(el), 1);

        props.setRows(rows);
        props.setFocusRow({});
    }

    const copyButton = (e, el) => {
        e.stopPropagation();

        const indexRow = props.rows.indexOf(props.row);
        const rows = [...props.rows];
        const indexColumn = rows[indexRow].content.indexOf(props.content);
        rows[indexRow].content[indexColumn].elements.splice(rows[indexRow].content[indexColumn].elements.indexOf(el) + 1, 0, JSON.parse(JSON.stringify({ ...el, id: props.maxIdElement })));
        props.setMaxIdElement(props.maxIdElement + 1);

        props.setRows(rows);
        props.setFocusRow({});
    }

    const moveStart = (e, el) => {
        const indexRow = props.rows.indexOf(props.row);
        const indexColumn = props.rows[indexRow].content.indexOf(props.content);
        props.setMoveElement({ element: { ...el }, indexRow: indexRow, indexColumn: indexColumn, indexElement: props.rows[indexRow].content[indexColumn].elements.indexOf(el) });
    }

    useEffect(() => {
        console.log(dropPosition)
    }, [dropPosition])

    return (
        <td className="row-column" width={props.content.style.width} style={{ ...props.content.style, display: 'inline-block', width: null, verticalAlign: 'top' }} ref={elementsRef} onDrop={drop} onDragLeave={dragLeave} >
            {props.content.elements.length !== 0
                ?
                props.content.elements.map((el, i) =>
                    <div key={el.id} style={el.columnElementStyle} className={`row-column-element ${props.focusElement.element && props.focusElement.element.id === el.id ? 'focus' : ''}`} onClick={(e) => focus(e, el)} onDragStart={(e) => dragStart(e, el)} onDragOver={(e) => dragStart(e, el)} onDragLeave={dragLeave} >
                        {getElementComponent(el)}
                        {i === dropPosition &&
                            <div className="row-column-drop" />
                        }
                        {i + 1 === dropPosition &&
                            <div className="row-column-drop-last" />
                        }
                        {props.focusElement.element && props.focusElement.element.id === el.id &&
                            <div className="row-focus-buttons">
                                <div className="row-focus-button delete" onClick={(e) => deleteButton(e, el)} ><TrashSvg /></div>
                                <div className="row-focus-button" onClick={(e) => copyButton(e, el)} ><CopySvg /></div>
                            </div>
                        }

                        {!props.focusRow || (props.focusRow && props.focusRow.id !== props.row.id) &&
                            <div className="button-move" draggable={true} onDragStart={(e) => moveStart(e, el)}><MoveSvg /></div>
                        }
                        {/* <div className="button-move" draggable={true} onDragStart={(e) => console.log(props.rows)}><MoveSvg /></div> */}
                    </div>
                )
                :
                <p className="text-center">Здесь пока пусто</p>
            }
            {!props.last &&
                <span onMouseDown={downResize} style={{
                    right: props.content.style.borderWidth ? `${-2 - parseFloat(props.content.style.borderWidth.split(" ")[1])}px` : '',
                    top: props.content.style.borderWidth ? `-${parseFloat(props.content.style.borderWidth.split(" ")[0])}px` : '',
                    height: props.content.style.borderWidth ? `calc(100% + ${parseFloat(props.content.style.borderWidth.split(" ")[0]) + parseFloat(props.content.style.borderWidth.split(" ")[2]) + 2.0}px)` : ''
                }} className="row-column-border"></span>
            }
        </td>
    )
}

export default Columns;