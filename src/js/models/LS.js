export default class LS {
  constructor(name) {
    this.name = name;
  }

  _getArrFromLocalStorage() {
    if (localStorage.getItem(this.name) !== null) {
      return JSON.parse(localStorage.getItem(this.name))
    }
    return false;
  }

  _addToLocalStorage(id) {
    if (!this.isSneakerLocalStorage()) {
      localStorage.setItem(this.name, JSON.stringify([id]));
    } else {
      let sneakers = this._getArrFromLocalStorage();
      if (!sneakers.includes(id)) {
        sneakers.push(id);
        localStorage.setItem(this.name, JSON.stringify(sneakers));
      }
    }
  }

  _delFromLocalStorage(id) {
    let sneakers = this._getArrFromLocalStorage();
    const i = sneakers.findIndex((el) => el === id);
    if (i !== -1) {
      sneakers.splice(i, 1);
    }
    localStorage.setItem(this.name, JSON.stringify(sneakers));
  }

  isSneakerLocalStorage() {
    return localStorage.getItem(this.name) ? true : false;
  }

  delAllFromLocalStorage() {
    localStorage.removeItem(this.name);
  }

  isIdInLocalStorage(id) {
    if (this.isSneakerLocalStorage()) {
      const sneakers = this._getArrFromLocalStorage();
      return sneakers.includes(id);
    }
    return false;
  }
  
  toggle(id) {
    this.isIdInLocalStorage(id)
      ? this._delFromLocalStorage(id)
      : this._addToLocalStorage(id)
  }
}