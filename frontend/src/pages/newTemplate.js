import React, { useState, useContext, useRef, createRef } from "react";
import { observer } from "mobx-react-lite";
import html2canvas from "html2canvas";
import { useScreenshot } from 'use-react-screenshot'

import EmailEditor from 'react-email-editor';
import { Context } from "..";


const LogCreateTemplate = observer((props) => {
    const emailEditorRef = useRef(null);
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot()

    const { mailings, lists, templates } = useContext(Context);

    const exportHtml = (e) => {
        e.preventDefault();
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            var doc = new DOMParser().parseFromString(html, "text/html");
            var a = doc.querySelector("body");
        });

    };

    const test = () => {

    }

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    }

    const onReady = () => {
        // editor is ready
        console.log('onReady');
    };

    return (
        <>
            <div className="buttons left">
                <button className="button" onClick={exportHtml}>Сохранить</button>
            </div>
            <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} locale={'ru-RU'} />
        </>
        // <section className={props.sideBarActive ? 'mailing-create menu-active' : 'mailing-create menu-closed'} id="section">

        // </section>
    )
})

export default LogCreateTemplate;