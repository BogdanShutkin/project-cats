// ## API сервера

// - GET (https://cats.petiteweb.dev/api/single/:user/show) - отобразить всех котиков
// - GET (https://cats.petiteweb.dev/api/single/:user/ids) - отобразить все возможные айди котиков
// - GET (https://cats.petiteweb.dev/api/single/:user/show/:id) - отобразить конкретного котика
// - POST (https://cats.petiteweb.dev/api/single/:user/add) - добавить котика
// - PUT (https://cats.petiteweb.dev/api/single/:user/update/:id) - изменить информацию о котике
// - DELETE (https://cats.petiteweb.dev/api/single/:user/delete/:id)- удалить котика из базы данных

const CONFIG_API = {
    url: 'https://cats.petiteweb.dev/api/single/BogdanShutkin',
    headers: {
        'Content-Type': 'application/json'
    }
}

class API {
    constructor (config){
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponce(res) {
        // if (res.ok) {
        //     return res.json();
        // } else {
        //     return Promise.reject({...res, message: 'Ошибка сервера'})
        // }
        return res.ok ? res.json() : Promise.reject({...res, message: 'Ошибка сервера'}) // если от сервера пришло 200, то обрабатываем, если нет - выводим ошибку
    }

    getAllCats() { // методом гет просим у сервера всех котиков и обрабатываем ответ
        return fetch(`${this._url}/show`, {
            method: 'GET'
        }).then(this._onResponce)
    }

    addNewCat(data){ // через метод ПОСТ отправляем нового котика на сервер
        return fetch(`${this._url}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onResponce)
    }

    deleteCatById(idCat){
        return fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
         }).then(this._onResponce)
    }

    editCatById(idCat){
        return fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
         }).then(this._onResponce)
    }
}

const api = new API (CONFIG_API); // экземпляр класса со ссылкой на наш сервер