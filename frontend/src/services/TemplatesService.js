import $api from "../http";

export default class ListsService {
    static async get_save(limit = 100, skip = 0) {
        return $api.get('/templates/', { limit, skip })
    }

    static async get_library(limit = 100, skip = 0) {
        return $api.get('/templates/library', { limit, skip })
    }
}