export default class Modal {
  constructor() {
    this.emailCheck = '';
    this.email = '';
    this.submitButtonDisabled = true;
  }

  setEmail(email) { 
    this.email = email;
    this._checkEmail();
    this._setSubmitButton();
  }

  _checkEmail() {
    if (this.email === '') {
      this.emailCheck = false;
      return false;
    }
    const rg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailCheck = rg.test(this.email);
  }

  _setSubmitButton() {
    this.submitButtonDisabled = !this.emailCheck;
  }
}