class CatsInfo { // для вывода информации о котике
    constructor(selectorTemplate, handleDeleteCat) {
        this._selectorTemplate = selectorTemplate;
        this._handleDeleteCat = handleDeleteCat;
        this._data = {};
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this._selectorTemplate).content.children[0];
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона

        this.buttonEdited = this.element.querySelector('.cat-info__edited'); //создаем переменные и связываем их с селекторами в файле хтмл
        this.buttonDeleted = this.element.querySelector('.cat-info__deleted');
        this.catImage = this.element.querySelector('.cat-info__image');
        this.catId = this.element.querySelector('.cat-info__id');      
        this.catInfo = this.element.querySelector('.cat-info__desc');
        this.catName = this.element.querySelector('.cat-info__name');
        this.catRate = this.element.querySelector('.cat-info__rate');
        this.catAge = this.element.querySelector('.cat-info__age-val');

        this.setEventListener();
        return this.element; // возвращаем созданный элемент
    }

    setData(cardInstance) {
        this._cardInstance = cardInstance;
        this._data = this._cardInstance.getData(); // getData в card.js - возвращает кота как объект
        this.catImage.src = this._data.image;
        this.catId.innerHTML = '';
        this.catId.append(this._data.id);
        this.catName.innerHTML = '';
        this.catName.append(this._data.name);
        this.catInfo.innerHTML = '';
        this.catInfo.append(this._data.description);
        this.catRate.innerHTML = '';
        this.catRate.append(this._data.rate);
        this.catAge.innerHTML = '';
        this.catAge.append(this._data.age);
    }

    setEventListener() {
        this.buttonDeleted.addEventListener('click', () => this._handleDeleteCat(this._cardInstance))
    }
}