import React, { useEffect, useState } from "react";
import Collapsible from 'react-collapsible';
import FontSize from "../menuComponents/FontSize";
import Color from "../menuComponents/Color";
import TextAlignFlex from "../menuComponents/TextAlignFlex";
import FlexDirection from "../menuComponents/FlexDirection";
import Padding from "../menuComponents/Padding";
import Margin from "../menuComponents/Margin";


const EditorEmailMenuMenu = (props) => {
    const [menu, setMenu] = useState({
        items: [...props.focusElement.element.items],
        fontSize: props.focusElement.element.listStyle.fontSize ? parseInt(props.focusElement.element.listStyle.fontSize) : 15,
        color: props.focusElement.element.style.color ? {
            r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
            g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
            b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
        } : { r: 0, g: 0, b: 0 },
        justifyContent: props.focusElement.element.listStyle.justifyContent || props.focusElement.element.listStyle.alignItems || 'center',
        flexDirection: props.focusElement.element.listStyle.flexDirection || 'row',
        padding: props.focusElement.element.style.padding ? {
            top: parseInt(props.focusElement.element.style.padding.split(" ")[0]),
            right: parseInt(props.focusElement.element.style.padding.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]),
            left: parseInt(props.focusElement.element.style.padding.split(" ")[3])
        } : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        paddingList: props.focusElement.element.listStyle.padding ? {
            top: parseInt(props.focusElement.element.listStyle.padding.split(" ")[0]),
            right: parseInt(props.focusElement.element.listStyle.padding.split(" ")[1]),
            bottom: parseInt(props.focusElement.element.listStyle.padding.split(" ")[2]),
            left: parseInt(props.focusElement.element.listStyle.padding.split(" ")[3])
        } : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });

    const deleteItem = (i) => {
        if (menu.items.length === 1) return

        const newMenu = { ...menu };
        newMenu.items.splice(i, 1);
        setMenu(newMenu);
    }

    const changeItemText = (i, e) => {
        const newMenu = { ...menu };
        newMenu.items[i].text = e.target.value;
        setMenu(newMenu);
    }

    const changeItemUrl = (i, e) => {
        const newMenu = { ...menu };
        newMenu.items[i].url = e.target.value
        setMenu(newMenu);
    }

    const setActionType = (i, e) => {
        const newMenu = { ...menu };
        newMenu.items[i].actionType = e.target.value
        setMenu(newMenu);
    }

    useEffect(() => {
        console.log(menu, props.focusElement)
        const rows = [...props.rows];
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].items = [...menu.items]
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style,
            color: `rgb(${menu.color.r}, ${menu.color.g}, ${menu.color.b})`,
            padding: `${menu.padding.top}px ${menu.padding.right}px ${menu.padding.bottom}px ${menu.padding.left}px`
        }
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].listStyle = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].listStyle,
            fontSize: `${menu.fontSize}px`,
            flexDirection: menu.flexDirection,
            padding: `${menu.paddingList.top}px ${menu.paddingList.right}px ${menu.paddingList.bottom}px ${menu.paddingList.left}px`
        }
        if (menu.flexDirection === 'row') {
            rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].listStyle.justifyContent = menu.justifyContent
            delete rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].listStyle.alignItems;
        }
        else {
            rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].listStyle.alignItems = menu.justifyContent
            delete rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].listStyle.justifyContent;
        }
        props.setRows(rows);
    }, [menu])

    useEffect(() => {
        setMenu({
            items: [...props.focusElement.element.items],
            fontSize: props.focusElement.element.listStyle.fontSize ? parseInt(props.focusElement.element.listStyle.fontSize) : 15,
            color: props.focusElement.element.style.color ? {
                r: parseInt(props.focusElement.element.style.color.split(")")[0].slice(4).split(", ")[0]),
                g: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[1]),
                b: parseInt(props.focusElement.element.style.color.split(")")[0].slice(5).split(", ")[2]),
            } : { r: 0, g: 0, b: 0 },
            justifyContent: props.focusElement.element.listStyle.justifyContent || props.focusElement.element.listStyle.alignItems || 'center',
            flexDirection: props.focusElement.element.listStyle.flexDirection || 'row',
            padding: props.focusElement.element.style.padding ? {
                top: parseInt(props.focusElement.element.style.padding.split(" ")[0]),
                right: parseInt(props.focusElement.element.style.padding.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.style.padding.split(" ")[2]),
                left: parseInt(props.focusElement.element.style.padding.split(" ")[3])
            } : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            paddingList: props.focusElement.element.listStyle.padding ? {
                top: parseInt(props.focusElement.element.listStyle.padding.split(" ")[0]),
                right: parseInt(props.focusElement.element.listStyle.padding.split(" ")[1]),
                bottom: parseInt(props.focusElement.element.listStyle.padding.split(" ")[2]),
                left: parseInt(props.focusElement.element.listStyle.padding.split(" ")[3])
            } : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        })
    }, [props.focusElement])

    return (
        <>
            <Collapsible trigger="Пункты меню" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                {menu.items.map((item, i) =>
                    <div key={i} className="editor-menu-collapse-item menu-item">
                        <div className="menu-item-delete" onClick={() => deleteItem(i)}></div>
                        <div className="editor-menu-collapse-input">
                            <span className="span-label">Текст</span>
                            <input className="text-span" type="text" value={item.text} onChange={(e) => changeItemText(i, e)} />
                        </div>
                        <div className="editor-menu-collapse-line">
                            <span>Тип действия</span>
                        </div>
                        <div className={`editor-menu-collapse-inputs active`}>
                            <div className="editor-menu-collapse-inputs-block width">
                                <select value={item.actionType} onChange={(e) => setActionType(i, e)} >
                                    <option value={'site'}>Открыть сайт</option>
                                    <option value={'mail'}>Отправить письмо</option>
                                    <option value={'phone'}>Позвонить по номеру</option>
                                </select>
                                {item.actionType === 'site' &&
                                    <div className="editor-menu-collapse-block">
                                        <div className="editor-menu-collapse-input">
                                            <span className="span-label">URL</span>
                                            <input className="text-span" type="text" value={item.url} onChange={(e) => changeItemUrl(i, e)} />
                                        </div>
                                    </div>
                                }
                                {item.actionType === 'mail' &&
                                    <div className="editor-menu-collapse-block">
                                        <div className="editor-menu-collapse-input">
                                            <span className="span-label">Кому</span>
                                            <input className="text-span" type="text" value={menu.toEmail} onChange={(e) => {
                                                const newMenu = { ...menu };
                                                newMenu.items[i].toEmail = e.target.value
                                                setMenu(newMenu);
                                            }} />
                                        </div>
                                        <div className="editor-menu-collapse-input">
                                            <span className="span-label">Тема</span>
                                            <input className="text-span" type="text" value={menu.fromEmail} onChange={(e) => {
                                                const newMenu = { ...menu };
                                                newMenu.items[i].subjectEmail = e.target.value
                                                setMenu(newMenu);
                                            }} />
                                        </div>
                                        <div className="editor-menu-collapse-input">
                                            <span className="span-label-content">Содержимое</span>
                                            <textarea className="content-span" value={menu.contentEmail} onChange={(e) => {
                                                const newMenu = { ...menu };
                                                newMenu.items[i].contentEmail = e.target.value
                                                setMenu(newMenu);
                                            }}></textarea>
                                        </div>
                                    </div>
                                }
                                {item.actionType === 'phone' &&
                                    <div className="editor-menu-collapse-block">
                                        <div className="editor-menu-collapse-input">
                                            <span className="span-label">Телефон</span>
                                            <input className="text-span" type="text" value={item.phone} onChange={(e) => {
                                                const newMenu = { ...menu };
                                                newMenu.items[i].phone = e.target.value
                                                setMenu(newMenu);
                                            }} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )}
                <button className="editor-menu-collapse-button" onClick={() => setMenu({
                    ...menu, items: [...menu.items, {
                        actionType: "site",
                        contentEmail: "",
                        fromEmail: "",
                        phone: "",
                        text: "Новый элемент",
                        toEmail: "",
                        url: ""
                    }]
                })}>Добавить еще</button>
            </Collapsible>
            <Collapsible trigger="Стили" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <FontSize value={menu.fontSize} onChange={(value) => setMenu({ ...menu, fontSize: value })} />
                <Color value={menu.color} onChange={(value) => setMenu({ ...menu, color: { ...value } })} />
                <TextAlignFlex value={menu.justifyContent} onChange={(value) => setMenu({ ...menu, justifyContent: value })} />
                <FlexDirection value={menu.flexDirection} onChange={(value) => setMenu({ ...menu, flexDirection: value })} />
                <Padding value={menu.padding} onChange={(value) => setMenu({ ...menu, padding: { ...value } })} />
            </Collapsible>
            <Collapsible trigger="Общее" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Margin value={menu.paddingList} onChange={(value) => setMenu({ ...menu, paddingList: { ...value } })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuMenu;