export default class Users {
  constructor(url) {
    this.url = url;
  }

  postData(email, sneakers) {
    const data = {
      email: email,
      sneakers: sneakers
    }

    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(`Ошибка передачи данных: ${response.status} ${response.statusText}`);
        }
      })
  }
}