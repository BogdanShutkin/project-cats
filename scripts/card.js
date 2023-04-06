class Card {
    constructor(dataCat, selectorTemplate, handleCatTitle) {
        this._dataCat = dataCat; // для передачи данных конкретного котика
        this._selectorTemplate = selectorTemplate; // для передачи селектора из файла хтмл
        this._handleCatTitle = handleCatTitle;
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this._selectorTemplate).content.querySelector('.card')
    }
    

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector('.card__name'); //создаем переменные и связываем их с селекторами в файле хтмл
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLike = this.element.querySelector('.card__like');

        this.cardTitle.textContent = this._dataCat.name; // созданным переменным присваиваем значение, взятое из конкретного объекта с котиком (cats.js)
        this.cardImage.src = this._dataCat.image; // в cats.js - img_link
        //this.cardLike = this._dataCat.favorite;

        if (this._dataCat.favorite) { // проверяем наличие лайка в объекте => добавляем класс active, которому прописан стиль css с красным сердечком
            this.cardLike.classList.toggle('card__like_active')
        }

        this.setEventListener()

        return this.element // возвращаем созданный элемент
    }

    setData(newData) {
        this._dataCat = newData;
    }

    getData(){
        return this._dataCat;
    }

    getId(){
        return this._dataCat.id;
    }

    getName(){
        return this._dataCat.name;
    }

    deleteView() {
        this.element.remove();
        this.element = null;
    }

    setEventListener() {
        this.cardImage.addEventListener('click', () => this._handleCatTitle(this));
        this.cardTitle.addEventListener('click', () => this._handleCatTitle(this));
    }

}