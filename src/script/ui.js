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
