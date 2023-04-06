class CatsInfo { // для вывода информации о котике
    constructor(selectorTemplate, handleDeleteCat, handleEditCat, handleSaveCat) {
        this._selectorTemplate = selectorTemplate;
        this._handleDeleteCat = handleDeleteCat;
        this._handleEditCat = handleEditCat;
        this._handleSaveCat = handleSaveCat;
        this._data = {};
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this._selectorTemplate).content.children[0];
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона

        this.buttonEdited = this.element.querySelector('.cat-info__edited'); //создаем переменные и связываем их с селекторами в файле хтмл
        this.buttonSaved = this.element.querySelector('.cat-info__saved');
        this.buttonDeleted = this.element.querySelector('.cat-info__deleted');
        this.catImage = this.element.querySelector('.cat-info__image');
        this.catId = this.element.querySelector('.cat-info__id');      
        this.catInfo = this.element.querySelector('.cat-info__desc');
        this.catName = this.element.querySelector('.cat-info__name');
        this.catRate = this.element.querySelector('.cat-info__rate');
        this.catAge = this.element.querySelector('.cat-info__age-val');
        this.catLike = this.element.querySelector('.cat-info__favorite');

        // if (this._data.favorite){
        //     this.CatLike.classList.toggle('cat-info__favorite_active');
        // }
        

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

        if (this._data.favorite){
            this.catLike.classList.toggle('cat-info__favorite_active');
        }
    }

    putData() {
        this.buttonEdited.classList.toggle('cat-info__edited_hidden');
        this.buttonSaved.classList.toggle('cat-info__saved_hidden');

        const inputName = document.createElement('input');
        inputName.className = 'form__input';
        inputName.name = 'name';
        inputName.placeholder= `${this._data.name}`;
        this.catName.innerHTML = '';
        this.catName.prepend(inputName);

        const inputRate = document.createElement('input');
        inputRate.className = 'form__input';
        inputRate.type = 'number';
        inputRate.name = 'rate';
        inputRate.placeholder= `${this._data.rate}`;
        inputRate.min = '0';
        inputRate.max = '10';
        this.catRate.innerHTML = '';
        this.catRate.prepend(inputRate);

        const inputAge = document.createElement('input');
        inputAge.className = 'form__input';
        inputAge.type = 'number';
        inputAge.name = 'age';
        inputAge.placeholder= `${this._data.age}`;
        this.catAge.innerHTML = '';
        this.catAge.prepend(inputAge);

        const inputInfo = document.createElement('input');
        inputInfo.className = 'form__input form__textarea';
        inputInfo.name = 'description';
        inputInfo.placeholder= `${this._data.description}`;
        this.catInfo.innerHTML = '';
        this.catInfo.prepend(inputInfo);
    }

    setEventListener() {
        this.buttonDeleted.addEventListener('click', () => this._handleDeleteCat(this._cardInstance));
        this.buttonEdited.addEventListener('click', () => this._handleEditCat(this._cardInstance));
        this.buttonSaved.addEventListener('click', () => this._handleSaveCat(this._cardInstance));
    }
}