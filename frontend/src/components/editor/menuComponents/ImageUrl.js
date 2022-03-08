import React, { useState, useEffect } from "react";


const ImageUrl = (props) => {
    const [url, setUrl] = useState(props.value)

    useEffect(() => {
        props.onChange(url)
    }, [url])

    useEffect(() => {
        if (props.value === url) return;
        setUrl(props.value)
    }, [props.value])

    return (
        <div className="editor-menu-collapse-item">
            <div className="editor-menu-collapse-input">
                <span className="span-label">Url</span>
                <input className="text-span" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
        </div>
    )
}

export default ImageUrl;