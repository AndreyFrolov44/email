import { makeAutoObservable } from "mobx";
import MailingsService from "../services/MailingsService";

export default class ListsStore {
    mailings = [];
    mailingsInfo = {};

    constructor() {
        makeAutoObservable(this);
    }

    setMailings(data) {
        this.mailings = data;
    }

    addMailings(data) {
        this.mailings.unshift(data);
    }

    setMailingsInfo(data) {
        this.mailingsInfo = data;
    }

    async allMailings(limit = 100, skip = 0) {
        try {
            const response = await MailingsService.get_all_mailings(limit, skip);
            this.setMailings(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async InfoMailings(id) {
        try {
            const response = await MailingsService.get_info_mailings(id);
            this.setMailingsInfo(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async createMailing(title, email, organisation, list_id, template_id) {
        try {
            const response = await MailingsService.create_mailing(title, email, organisation, list_id, template_id);
            this.addMailings(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}