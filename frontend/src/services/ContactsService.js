import $api from "../http";

export default class ContactService {
    static async get_all_contacts(limit = 100, skip = 0) {
        return $api.get('/contacts/all', { params: { limit, skip } });
    }

    static async get_count_contacts() {
        return $api.get('/contacts/all/count');
    }

    static async get_all_contacts_in_list(list_id, limit = 100, skip = 0) {
        return $api.get('/contacts', { params: { list_id, limit, skip } });
    }

    static async create_contacts(contactsList) {
        return $api.post('/contacts/', contactsList);
    }

    static async delete_contacts(id) {
        return $api.delete('/contacts/', { params: { id } });
    }
}