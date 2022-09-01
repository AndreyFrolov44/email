import React, { useState, useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../..";


const UploadImage = observer((props) => {
    const fileInput = useRef(null);
    const [drag, setDrag] = useState(false);
    const [url, setUrl] = useState(props.value);
    const [id, setId] = useState(props.id);

    const { templates } = useContext(Context)

    const dragStart = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeave = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    const drop = (e) => {
        e.preventDefault();

        let newFile = e.dataTransfer.files[0];
        let formData = new FormData();
        formData.append('img', newFile)

        if (id) {
            templates.deleteImage(id)
                .then(() => {
                    setUrl('');
                    setId(null);
                    templates.saveImage(formData)
                        .then(() => {
                            setUrl(templates.imageUrl);
                            setId(templates.imageId);
                        })
                })
        }
        else {
            templates.saveImage(formData)
                .then(() => {
                    setUrl(templates.imageUrl);
                    setId(templates.imageId);
                })
        }


        setDrag(false);
    }

    const clickUpload = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('img', e.target.files[0])

        if (id) {
            templates.deleteImage(id)
                .then(() => {
                    setUrl('');
                    setId(null);
                    templates.saveImage(formData)
                        .then(() => {
                            setUrl(templates.imageUrl);
                            setId(templates.imageId);
                        })
                })
        }
        else {
            templates.saveImage(formData)
                .then(() => {
                    setUrl(templates.imageUrl);
                    setId(templates.imageId);
                })
        }
    }

    useEffect(() => {
        props.onChange(url, id);
    }, [url, id])

    useEffect(() => {
        if (props.value === url || props.id === id) return;
        console.log(props.value, props.id)
        setUrl(props.value);
        setId(props.id);
    }, [props.value, props.id])

    // useEffect(() => {

    // }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-line">
                <span>Фоновое изображение</span>
                <button onClick={() => fileInput.current.click()} className="editor-menu-file-button">
                    Загрузить изображение
                    <input onChange={clickUpload} ref={fileInput} type="file" accept="image/*" autoComplete="off" className="editor-menu-file" />
                </button>
            </div>
            <div className={`editor-menu-drop ${drag ? 'active' : ''}`} onClick={() => fileInput.current.click()} onDragStart={dragStart} onDragOver={dragStart} onDragLeave={dragLeave} onDrop={drop}>
                Перетяните сюда изображение или нажмите
            </div>
        </div>
    )
})

export default UploadImage;