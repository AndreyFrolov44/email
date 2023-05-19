import $api from "../http";

export default class ListsService {
    static async get_all_lists(limit = 100, skip = 0) {
        return $api.get('/lists/', { limit, skip })
    }

    static async get_list_info(id) {
        return $api.get('/lists/info/' + id)
    }

    static async create_list(name) {
        return $api.post('/lists/', { name })
    }

    static async update_list(id, name) {
        return $api.put('/lists/', { name }, { params: { id: id } })
    }

    static async delete_lists(id) {
        return $api.delete('/lists/', {
            params: { id: id }
        })
    }
}