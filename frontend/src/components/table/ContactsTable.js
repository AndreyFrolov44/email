import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import dateFormat from "dateformat";

import { Context } from "../..";

const ContactsTable = observer((props) => {
    const { contacts } = useContext(Context);

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
                <a href="#">{props.c.email}</a>
            </th>
            <th>{props.c.phone_number}</th>
            <th>{props.c.name}</th>
            <th>{dateFormat(props.c.date, "dd.mm.yyyy")}</th>
            <th>{props.c.list_name}</th>
        </tr>
    )
})

export default ContactsTable;