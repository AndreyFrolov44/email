import React from "react";
import { observer } from "mobx-react-lite";

const ContactsMailingTable = observer((props) => {
    return (
        <tr>
            <th>
                <input type="checkbox" />
                <a href="#">{props.c.email}</a>
            </th>
            <th>{props.c.phone_number}</th>
            <th>{props.c.name}</th>
            <th className="column-center">{props.c.read ? '+' : '-'}</th>
        </tr>
    )
})

export default ContactsMailingTable;