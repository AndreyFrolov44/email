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

    addSaved(data) {
        this.savedTemplates.push(data);
    }

    updateSaved(data) {
        this.savedTemplates.splice(this.savedTemplates.findIndex(template => template.id === data.id), 1, data);
    }

    deleteSaved(id) {
        this.savedTemplates.splice(this.savedTemplates.findIndex(template => template.id === id), 1);
    }

    async allSaved(limit = 100, skip = 0) {
        try {
            const response = await TemplatesService.get_save(limit, skip);
            this.setSaved(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async allLibrary(limit = 100, skip = 0) {
        try {
            const response = await TemplatesService.get_library(limit, skip);
            this.setLibrary(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async saveImage(file) {
        try {
            const response = await TemplatesService.save_image(file);
            this.setImageUrl(response.data.img);
            this.setImageId(response.data.id);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteImage(id) {
        try {
            const response = await TemplatesService.delete_image(id);
            this.setImageUrl('');
            this.setImageId(null);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async createTemplate(formData) {
        try {
            const response = await TemplatesService.create_temaplate(formData);
            this.addSaved(response.data)
        } catch (e) {
            console.log(e.response);
        }
    }

    async updateTemplate(id, formData) {
        try {
            const response = await TemplatesService.update_temaplate(id, formData);
            this.updateSaved(response.data)
        } catch (e) {
            console.log(e.response);
        }
    }

    async deleteTemplate(id) {
        try {
            const response = await TemplatesService.delete_template(id);
            this.deleteSaved(id)
        } catch (e) {
            console.log(e?.response);
        }
    }

    async templateInfo(id) {
        try {
            const response = await TemplatesService.get_template_info(id);
            return response.data;
        } catch (e) {
            console.log(e?.response);
        }
    }
}