class HTTP {
    static #API = 'https://jsonplaceholder.typicode.com/';

    get(endpoint) {
        return fetch(HTTP.#API + endpoint)
    }

    delete(endpoint, id) {
        return fetch(HTTP.#API + endpoint + id, {
            method: 'DELETE',
          });
          
    }

    edit(endpoint, id, newUserData) {
        return fetch(HTTP.#API + endpoint + id, {
            method: 'PUT',
            body: JSON.stringify(newUserData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    create(endpoint, userData) {
        return fetch(HTTP.#API + endpoint, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
}
