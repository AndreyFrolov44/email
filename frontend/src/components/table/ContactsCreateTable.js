import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

const ContactsCreateTable = observer((props) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const emailContact = (e) => {
        setEmail(e.target.value);
        props.setValue(
            {
                id: props.id,
                email: e.target.value,
                phone: phone,
                name: name,
                error: false
            }
        )
    }

    const phoneContact = (e) => {
        setPhone(e.target.value);
        props.setValue(
            {
                id: props.id,
                email: email,
                phone: e.target.value,
                name: name,
                error: false
            }
        )
    }

    const nameContact = (e) => {
        setName(e.target.value);
        props.setValue(
            {
                id: props.id,
                email: email,
                phone: phone,
                name: e.target.value,
                error: false
            }
        )
    }

    return (
        <tr>
            {/* <th>{props.id}</th> */}
            <th><input value={email} onChange={emailContact} className={props.error && "error"} /></th>
            <th><input value={phone} onChange={phoneContact} /></th>
            <th><input value={name} onChange={nameContact} /></th>
        </tr>
    )
})

export default ContactsCreateTable;