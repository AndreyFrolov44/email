import { makeAutoObservable } from "mobx";
import TemplatesService from "../services/TemplatesService";

export default class TemplatesStore {
    savedTemplates = [];
    libraryTemplates = [];

    constructor() {
        makeAutoObservable(this);
    }

    setSaved(data) {
        this.savedTemplates = data;
    }

    setLibrary(data) {
        this.libraryTemplates = data;
    }

    async allSaved(limit = 100, skip = 0) {
        try {
            const response = await TemplatesService.get_save(limit, skip);
            this.setSaved(response.data);
            console.log("Запрос сохраненных шаблонов")
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async allLibrary(limit = 100, skip = 0) {
        try {
            const response = await TemplatesService.get_library(limit, skip);
            this.setLibrary(response.data);
            console.log("Запрос шаблонов из библиотеки")
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}