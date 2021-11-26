const ENVIRONMENT = {
    USERS: {
        getUsers: 'users/',
    }
}

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

class RENDEREL {
    containerEl = document.querySelector('#users');
    createBtnEl = document.querySelector('#create-btn');
    popUpEl = document.querySelector('#pop-up-bg');
    formEl = document.querySelector('#form')
    userInputEl = document.querySelector('.form-input');
    okBtnEl = document.querySelector('.agree-btn');
    blockEl = 'div';
    paragraphEl = 'p';
    btnEl = 'button';
    blockClass = 'user-block';
    paragraphClass = 'user-paragraph';
    btnClass = 'user-btn';
    btnDeleteClass = 'delete-btn';
    btnEditClass = 'edit-btn';
    editBtnTxt = 'Edit user';
    deleteBtnText = 'Delete user'

    showUsers(name, id) {
        this.containerEl.insertAdjacentHTML('beforeend', `
            <${this.blockEl} class = "${this.blockClass}" id = "${id}">
            <${this.paragraphEl} class = "${this.paragraphClass}">${name}</${this.paragraphEl}>
            <${this.btnEl} class = "${this.btnClass} ${this.btnEditClass}">${this.editBtnTxt}</${this.btnEl}>
            <${this.btnEl} class = "${this.btnClass} ${this.btnDeleteClass}">${this.deleteBtnText}</${this.btnEl}>
            </${this.blockEl}>`)
    }

    popUpOn() {
        this.popUpEl.classList.add('activePopUp');
        this.createBtnEl.classList.add('active-add-btn');
    }

    popUpOff() {
        this.userInputEl.value = '';
        this.createBtnEl.classList.remove('active-add-btn');
        this.popUpEl.classList.remove('activePopUp');
    }

    clearForm() {
        this.formEl.innerHTML = '';
    }

}

init();

function init() {
    const http = new HTTP();
    const ui = new RENDEREL();
    let userData = {}

    ui.containerEl.addEventListener('click', onClickUserBtn);
    ui.createBtnEl.addEventListener('click', onClickCreateBtn);
    ui.popUpEl.addEventListener('click', onClickConfirmBtn)

    http.get(ENVIRONMENT.USERS.getUsers)
    .then((response) => response.json())
    .then(rdata => {
        rdata.forEach(element => {
            ui.showUsers(element.name, element.id)
        });
        return rdata
    })
    .catch(error => console.log('USERS ERROR', error))

    function onClickUserBtn(e) {
        let userId = e.target.parentNode.id;
        if (e.target.classList.contains('delete-btn')) {
            http.delete(ENVIRONMENT.USERS.getUsers, userId)
            .then(response => {
                e.target.parentNode.remove()
                console.log(response)
            })
            .catch(error => console.log('DELETE ERROR', error))
        } else if (e.target.classList.contains('edit-btn')) {
            ui.popUpOn();
            ui.okBtnEl.id = 'edit-btn-ok';
            http.get(ENVIRONMENT.USERS.getUsers + userId)
            .then((response) => response.json())
            .then(res => {
                userData = res
                ui.userInputEl.value = userData.name
            })
            .catch(error => console.log('EDIT ERROR', error))
        }
    }

    function onClickCreateBtn(e) {
        if (e.target.classList.contains('add-btn')) {
            ui.popUpOn()
            ui.okBtnEl.id = 'add-btn-ok';
        }
    }

    function onClickConfirmBtn(e) {
        if (e.target.id === 'add-btn-ok') {
            if (ui.userInputEl.value) {
                let newUser = {
                id: Math.random()
                };
                newUser.name = ui.userInputEl.value;
                http.create(ENVIRONMENT.USERS.getUsers, newUser)
                .then(res => console.log(res))
                .catch(error => console.log('CREATE ERROR', error))
                ui.showUsers(newUser.name)
                ui.popUpOff()
            }
        } else if (e.target.classList.contains('discard-btn')) {
            ui.popUpOff()
        } else if (e.target.id === 'edit-btn-ok') {
            userData.name = ui.userInputEl.value
            let editedEl = document.getElementById(userData.id)
            editedEl.firstElementChild.textContent = ui.userInputEl.value
            http.edit(ENVIRONMENT.USERS.getUsers, userData.id, userData)
            .then(response => console.log(response))
            .catch(error => console.log('EDIT ERROR', error))
            ui.popUpOff()
        }
    }
}
