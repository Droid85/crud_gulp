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
