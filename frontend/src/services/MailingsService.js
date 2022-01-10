import $api from "../http";

export default class ListsService {
    static async get_all_mailings(limit = 100, skip = 0) {
        return $api.get('/mailings/', { limit, skip })
    }

    static async get_info_mailings(id) {
        return $api.get('/mailings/info/' + id)
    }

    static async create_mailing(title, email, organisation, list_id, template_id) {
        return $api.post('mailings/', { title, email, organisation, list_id, template_id });
    }
}