import { makeAutoObservable } from "mobx";
import ContactsService from "../services/ContactsService";

export default class ContactsStore {
    contactsCount = 0;
    contacts = [];
    checkedContacts = [];

    constructor() {
        makeAutoObservable(this);
    }

    setContactsCount(data) {
        this.contactsCount = data;
    }

    setContacts(data) {
        this.contacts = data;
    }

    setCheckedContacts(id) {
        const index = this.checkedContacts.indexOf(id);
        if (index > -1)
            this.checkedContacts.splice(index, 1);
        else
            this.checkedContacts.push(id);
    }

    resetChecked() {
        this.checkedContacts = [];
    }

    async countContacts() {
        try {
            const response = await ContactsService.get_count_contacts()
            this.setContactsCount(response.data.count);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async allContacts(limit = 100, skip = 0) {
        try {
            const response = await ContactsService.get_all_contacts(limit, skip)
            this.setContacts(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async allContactsInList(listId, limit = 100, skip = 0) {
        try {
            const response = await ContactsService.get_all_contacts_in_list(listId, limit, skip)
            this.setContacts(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteContacts() {
        try {
            const response = await ContactsService.delete_contacts(this.checkedContacts.join());
            const newContacts = this.contacts.filter((val) => {
                if (!this.checkedContacts.includes(val.id))
                    return val;
            })
            this.setContacts(newContacts);
            this.resetChecked();
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}