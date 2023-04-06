class Popup {
    constructor(className) { // в качестве аргумента передаем имя класса из хтмл
        this._className = className;
        this.popup = document.querySelector(`.${className}`)
        this._handleEscUp = this._handleEscUp.bind(this); // привязывает контекст к этому классу (Popup)
    }

    _handleEscUp(evt) { // функцияя закрывания при нажатии клавиши ESC
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    open() { // открывает попап добавляя класс актив; добавляет слушателя при отпускании клавиши запускает функцию  _handleEscUp
        this.popup.classList.add('popup_active');
        document.addEventListener('keyup', this._handleEscUp);
    }

    close() {// закрывает попап удаляя класс актив; удаляет слушателя при отпускании клавиши запускает функцию  _handleEscUp
        this.popup.classList.remove('popup_active')
        document.removeEventListener('keyup', this._handleEscUp)
    }
    
    setContent(contentNode) {
        const containerContent = this.popup.querySelector('.popup__content');
        containerContent.innerHTML = ''; // не работает
        containerContent.append(contentNode);
    }

    setEventListener(){ // создаем слушателя по клику, если во внешнюю область или на крестик, то функция закрытия попапа
        this.popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._className) || evt.target.closest('.popup__close')) {
                this.close();
            }
        })
    }
}