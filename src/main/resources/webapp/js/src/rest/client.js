import {STATUS_COMPLETE, STATUS_INCOMPLETE} from "../index";

const BASE_URL = "http://localhost:8080/api/todo"

export function save_item(item) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json());

}


export function get_all_items(size = 25, page = 0) {
    return fetch(BASE_URL + `?size=${size}&page=${page}`, {
        method: "GET"
    })
        .then(value => value.json())
        .then(value => value.content);
}

export function delete_item(id) {
    return fetch(BASE_URL + `/${id}`, {
        method: "DELETE"
    });
}

export function check_item(id, checked) {
    let status = checked ? STATUS_COMPLETE : STATUS_INCOMPLETE;
    return fetch(BASE_URL + `/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                status: status
            }
        )
    })
        .then(response => response.json());
}

export function update_item(id, item) {
    return fetch(BASE_URL + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json());
}

export function get_item(id) {
    return fetch(BASE_URL + `/${id}`, {
        method: "GET"
    })
        .then(response => response.json());
}
