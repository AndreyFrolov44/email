import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

const Tab = observer((props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [tabActive, setTabActive] = useState(searchParams.get('tab') === null ? props.children[0].props.name : searchParams.get('tab'));

    useEffect(() => {
        setTabActive(searchParams.get('tab') === null ? props.children[0].props.name : searchParams.get('tab'))
    }, [searchParams])

    return (
        <>
            <div className="tabulation">
                {props.children.map(el =>
                    <span className={tabActive === el.props.name ? "tabulation-item active" : "tabulation-item"} onClick={() => setSearchParams({ 'tab': el.props.name })}>{el.props.nameRu}</span>
                )}
            </div>
            <div className="tab">
                {props.children.map(el =>
                    <div className={tabActive === el.props.name ? "tab-item active" : "tab-item"}>
                        {el}
                    </div>
                )}
            </div>
        </>
    )
})

export default Tab;