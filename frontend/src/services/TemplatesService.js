import $api from "../http";

export default class TemplateService {
    static async get_save(limit = 100, skip = 0) {
        return $api.get('/templates/', { limit, skip })
    }

    static async get_library(limit = 100, skip = 0) {
        return $api.get('/templates/library', { limit, skip })
    }

    static async save_image(img) {
        return $api.post('/user_img/', img, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async delete_image(id) {
        return $api.delete('/user_img/' + id);
    }
}