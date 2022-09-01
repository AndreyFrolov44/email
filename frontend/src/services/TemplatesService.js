import $api from "../http";
import jsxToString from 'jsx-to-string';

export default class TemplateService {
    static async get_save(limit = 100, skip = 0) {
        return $api.get('/templates/', { limit, skip })
    }

    static async get_library(limit = 100, skip = 0) {
        return $api.get('/templates/library', { limit, skip })
    }

    static async save_image(img) {
        console.log(img)
        return $api.post('/user_img/', img, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async delete_image(id) {
        return $api.delete('/user_img/' + id);
    }

    static async create_temaplate(formData) {
        return $api.post('/templates/', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    static async update_temaplate(id, formData) {
        return $api.put(`/templates/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    static async delete_template(id) {
        return $api.delete(`/templates/${id}`)
    }

    static async get_template_info(id) {
        return $api.get(`templates/info/${id}`)
    }
}