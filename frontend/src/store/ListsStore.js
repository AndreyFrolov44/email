import { makeAutoObservable } from "mobx";
import ListsService from "../services/ListsService";
import ContactsService from "../services/ContactsService";

export default class ListsStore {
    lists = [];
    list = {};
    checkedListsId = [];
    checkedContacts = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLists(data) {
        this.lists = data;
    }

    setList(data) {
        this.list = data;
    }

    setCheckedListsId(id) {
        const index = this.checkedListsId.indexOf(id);
        if (index > -1)
            this.checkedListsId.splice(index, 1);
        else
            this.checkedListsId.push(id);
    }

    setCheckedContacts(id) {
        const index = this.checkedContacts.indexOf(id);
        if (index > -1)
            this.checkedContacts.splice(index, 1);
        else
            this.checkedContacts.push(id);
    }

    resetCheckedContacts() {
        this.checkedContacts = [];
    }

    resetChecked() {
        this.checkedListsId = [];
    }

    addList(data) {
        this.lists.unshift(data);
    }

    addContact(data) {
        this.list.contacts.unshift(data);
    }

    setNewContacts(data) {
        this.list.contacts = data;
    }

    async allLists(limit = 100, skip = 0) {
        try {
            const response = await ListsService.get_all_lists(limit, skip);
            this.setLists(response.data);
            console.log("Запрос списков")
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getInfo(id) {
        try {
            const response = await ListsService.get_list_info(id);
            this.setList(response.data);
            console.log("Запрос списка id=" + id);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async createList(name) {
        try {
            const response = await ListsService.create_list(name)
            this.addList(response.data);
            console.log("Запрос создания контакта");
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async updateList(id, name) {
        try {
            const response = await ListsService.update_list(id, name)
            this.addList(response.data);
            console.log("Запрос создания контакта");
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteLists() {
        try {
            const response = await ListsService.delete_lists(this.checkedListsId.join());
            const newLists = this.lists.filter((val) => {
                if (!this.checkedListsId.includes(val.id))
                    return val;
            })
            this.setLists(newLists);
            this.resetChecked();
            console.log("Запрос удаления списка");
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    // async createContacts(name, email, phone_number, list_id) {
    //     try {
    //         const response = await ContactsService.create_contacts(name, email, phone_number, list_id)
    //         this.addContact(response.data);
    //         console.log("Запрос создания контактов");
    //     } catch (e) {
    //         console.log(e.response?.data?.detail);
    //     }
    // }

    async createContacts(contactsList) {
        try {
            const response = await ContactsService.create_contacts(contactsList)
            this.addContact(response.data);
            console.log("Запрос создания контактов");
        } catch (e) {
            return e.response?.data?.detail;
        }
    }

    async deleteContacts() {
        try {
            const response = await ContactsService.delete_contacts(this.checkedContacts.join());
            const newContacts = this.list.contacts.filter((val) => {
                if (!this.checkedContacts.includes(val.id))
                    return val;
            })
            this.setNewContacts(newContacts);
            this.resetCheckedContacts();
            console.log("Запрос удаления контактов");
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}