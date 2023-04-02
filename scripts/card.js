class Card {
    constructor(dataCat, selectorTemplate) {
        this._dataCat = dataCat; // для передачи данных конкретного котика
        this._selectorTemplate = selectorTemplate; // для передачи селектора из файла хтмл
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона
        const cardTitle = this.element.querySelector('.card__name'); //создаем переменные и связываем их с селекторами в файле хтмл
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');

        cardTitle.textContent = this._dataCat.name; // созданным переменным присваиваем значение, взятое из конкретного объекта с котиком (cats.js)
        cardImage.src = this._dataCat.img_link;

        if (this._dataCat.favourite) { // проверяем наличие лайка в объекте => добавляем класс active, которому прописан стиль css с красным сердечком
            cardLike.classList.toggle('card__like_active')
        }

        return this.element // возвращаем созданный элемент
    }

    setElement() {
        // нужно взять секцию кардс и в нее добавить карточку с котиком
    }
    
}

