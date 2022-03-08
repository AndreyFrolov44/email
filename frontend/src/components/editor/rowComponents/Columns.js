import React, { useEffect, useState } from "react";

import Menu from "../rowComponents/Menu";
import Button from "./Button";
import Delimiter from "./Delimiter";
import Header from "./Header";
import Text from "./Text";
import Image from "./Image";


const Columns = (props) => {

    const downResize = (e) => {
        props.setCurrentX({ old: e.clientX, new: e.clientX })
        props.setIsResize(true)

        props.setCurrentRow(props.row)
        props.setIndex(props.row.content.indexOf(props.content));
    }

    const drop = (e) => {
        if (props.newColumns.length !== 0) return;
        e.stopPropagation();
        props.setHover(false);

        const indexRow = props.rows.indexOf(props.row);
        const rows = [...props.rows];
        const indexColumn = rows[indexRow].content.indexOf(props.content);

        if (props.newElements === "button") {
            rows[indexRow].content[indexColumn] = {
                ...props.row.content[indexColumn],
                elements: [
                    ...props.row.content[indexColumn].elements,
                    {
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
                            cursor: 'pointer'
                        },
                        id: props.maxIdElement,
                        columnElementStyle: {
                            textAlign: 'center'
                        }
                    }]
            };
        } else if (props.newElements === "menu") {
            rows[indexRow].content[indexColumn] = {
                ...props.row.content[indexColumn],
                elements: [
                    ...props.row.content[indexColumn].elements,
                    {
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
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        },
                        id: props.maxIdElement,
                    }]
            };
        } else if (props.newElements === "text") {
            rows[indexRow].content[indexColumn] = {
                ...props.row.content[indexColumn],
                elements: [
                    ...props.row.content[indexColumn].elements,
                    {
                        element: props.newElements,
                        text: 'Это новый текстовый элемент. Вы можете изменить содержимое',
                        style: {
                            display: 'inline-block',
                            color: 'rgb(0, 0, 0)',
                        },
                        columnElementStyle: {
                            textAlign: 'left'
                        },
                        id: props.maxIdElement,
                    }]
            };
        } else if (props.newElements === "delimiter") {
            rows[indexRow].content[indexColumn] = {
                ...props.row.content[indexColumn],
                elements: [
                    ...props.row.content[indexColumn].elements,
                    {
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
                    }]
            };
        } else if (props.newElements === "header") {
            rows[indexRow].content[indexColumn] = {
                ...props.row.content[indexColumn],
                elements: [
                    ...props.row.content[indexColumn].elements,
                    {
                        element: props.newElements,
                        text: 'Заголовок',
                        type: "h1",
                        style: {
                            display: "inline-block",
                            fontWeight: "bold",
                            fontSize: "22px",
                            lineHeight: "140%",
                            margin: "10px 10px 10px 10px"
                        },
                        columnElementStyle: {
                            textAlign: 'left'
                        },
                        id: props.maxIdElement,
                    }]
            };
        }
        else if (props.newElements === "image") {
            rows[indexRow].content[indexColumn] = {
                ...props.row.content[indexColumn],
                elements: [
                    ...props.row.content[indexColumn].elements,
                    {
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
                    }]
            };
        }
        rows[indexRow].style = { ...rows[indexRow].style, height: 'auto' }
        props.setMaxIdElement(props.maxIdElement + 1);
        props.setRows(rows);
    }

    const focus = (e, element) => {
        e.stopPropagation();
        const indexRow = props.rows.indexOf(props.row);
        const columnIndex = props.rows[indexRow].content.indexOf(props.content);
        props.setFocusElement({ element: { ...element }, indexRow: indexRow, columnIndex: columnIndex, elementIndex: props.rows[indexRow].content[columnIndex].elements.indexOf(element) });
        console.log({ element: { ...element }, indexRow: indexRow, columnIndex: columnIndex, elementIndex: props.rows[indexRow].content[columnIndex].elements.indexOf(element) })
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

    useEffect(() => {
    }, [props.focusElement])

    return (
        <div className="row-column" style={props.content.style} onDrop={drop}>
            {props.content.elements.length !== 0
                ?
                props.content.elements.map(el =>
                    <div key={el.id} style={el.columnElementStyle} className={`row-column-element ${props.focusElement.element && props.focusElement.element.id === el.id ? 'focus' : ''}`} onClick={(e) => focus(e, el)}>
                        {getElementComponent(el)}
                    </div>
                )
                :
                <p className="text-center">Здесь пока пусто</p>}
            {!props.last &&
                <span onMouseDown={downResize} style={{
                    right: props.content.style['border-width'] ? `${-2 - parseFloat(props.content.style['border-width'].split(" ")[1])}px` : '',
                    top: props.content.style['border-width'] ? `-${parseFloat(props.content.style['border-width'].split(" ")[0])}px` : '',
                    height: props.content.style['border-width'] ? `calc(100% + ${parseFloat(props.content.style['border-width'].split(" ")[0]) + parseFloat(props.content.style['border-width'].split(" ")[2]) + 2.0}px)` : ''
                }} className="row-column-border"></span>
            }
        </div>
    )
}

export default Columns;