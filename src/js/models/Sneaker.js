export default class Sneakers {
  constructor(url) {
    this.url = url;
  }

  getData(page, limit, sort, order) {
    return fetch(`${this.url}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(`Неизвестная ошибка:${response.status} ${response.statusText}`);
      })
      .then((result) => {
        this.data = result;
      })
  }

  getAllData() {
    return fetch(this.url)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw Error(`Неизвестная ошибка:${response.status} ${response.statusText}`)
      })
      .then((result) => {
        this.dataAll = result;
      })
  }
}