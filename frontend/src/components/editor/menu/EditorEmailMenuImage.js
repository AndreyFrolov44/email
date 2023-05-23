import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import ImageUrl from "../menuComponents/ImageUrl";
import Input from "../menuComponents/Input";
import Padding from "../menuComponents/Padding";
import TextAlign from "../menuComponents/TextAlign";
import UploadImage from "../menuComponents/UploadImage";
import Width from "../menuComponents/Width";


const EditorEmailMenuImage = (props) => {
    const [image, setImage] = useState({
        src: props.focusElement.element.src,
        id: props.focusElement.element.imageId,
        width: parseInt(props.focusElement.element.style.width),
        textAlign: props.focusElement.element.columnElementStyle.textAlign,
        alt: props.focusElement.element.alt,
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
    })

    useEffect(() => {
        const rows = [...props.rows];
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].style,
            width: `${image.width}%`,
            padding: `${image.padding.top}px ${image.padding.right}px ${image.padding.bottom}px ${image.padding.left}px`
        }

        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle = {
            ...rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].columnElementStyle,
            textAlign: image.textAlign
        }
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].src = image.src
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].imageId = image.id
        rows[props.focusElement.indexRow].content[props.focusElement.columnIndex].elements[props.focusElement.elementIndex].alt = image.alt
        props.setRows(rows);
    }, [image])

    useEffect(() => {
        setImage({
            src: props.focusElement.element.src,
            id: props.focusElement.element.imageId,
            width: parseInt(props.focusElement.element.style.width),
            textAlign: props.focusElement.element.columnElementStyle.textAlign,
            alt: props.focusElement.element.alt,
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
        })
    }, [props.focusElement])

    return (
        <>
            <Collapsible trigger="Изображение" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <UploadImage value={image.src} id={image.id} onChange={(value, id) => setImage({ ...image, src: value, id: id })} />
                <ImageUrl value={image.src} onChange={(value) => setImage({ ...image, src: value })} />
                <Width value={image.width} onChange={(value) => setImage({ ...image, width: value })} focusElement={props.focusElement} />
                <TextAlign value={image.textAlign} onChange={(value) => setImage({ ...image, textAlign: value })} />
                <Input title={'alt'} value={image.alt} onChange={(value) => setImage({ ...image, alt: value })} />
            </Collapsible>
            <Collapsible trigger="Общее" triggerTagName="h5" triggerClassName="editor-menu-collapse-title close" triggerOpenedClassName="editor-menu-collapse-title" contentOuterClassName="editor-menu-collapse-block" transitionTime={100} open={true}>
                <Padding value={image.padding} onChange={(value) => setImage({ ...image, padding: value })} />
            </Collapsible>
        </>
    )
}

export default EditorEmailMenuImage;