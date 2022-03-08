import { makeAutoObservable } from "mobx";
import TemplatesService from "../services/TemplatesService";

export default class TemplatesStore {
    savedTemplates = [];
    libraryTemplates = [];
    imageUrl = '';
    imageId = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSaved(data) {
        this.savedTemplates = data;
    }

    setLibrary(data) {
        this.libraryTemplates = data;
    }

    setImageUrl(data) {
        this.imageUrl = data;
    }

    setImageId(data) {
        this.imageId = data;
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

    async saveImage(file) {
        try {
            const response = await TemplatesService.save_image(file);
            this.setImageUrl(response.data.img);
            this.setImageId(response.data.id);
            console.log("Запрос добавления изображения")
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteImage(id) {
        try {
            const response = await TemplatesService.delete_image(id);
            this.setImageUrl('');
            this.setImageId(null);
            console.log("Запрос удаления изображения")
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}