import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

import { LOG_LISTS } from "../../utils/consts";

const ListsTable = observer((props) => {
    return (
        <tr>
            <th>
                <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    onChange={props.handleClick}
                    checked={props.isChecked}
                />
                <Link to={LOG_LISTS + props.l.id}>{props.l.name}</Link>
            </th>
            <th>{dateFormat(props.l.date, "dd.mm.yyyy")}</th>
            <th>{props.l.contacts_count}</th>
        </tr>
    )
})

export default ListsTable;