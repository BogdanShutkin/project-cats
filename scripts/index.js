// 1 Сделать свой стиль и создать проект
// 2 Перебрать массив котов и отобразить их на странице

const btnOpenPopupForm = document.querySelector('#add'); // кнопка добавления кота в хэдере
const formAddCat = document.querySelector('#popup-form-cat'); // форма с инпутами для добавления кота из хтмл (пустая)
const formAccept = document.querySelector('#popup-form-accept');
const formEdit = document.querySelector('#cats-info-template');
const sectionCard = document.querySelector('.cards'); // пустая секция для котов

const popupAddCat = new Popup("popup-add-cats"); // попап для добавления кота (из файла popup.js)
popupAddCat.setEventListener(); // слушатель на открытом попапе для его закрытия

const popupAccept = new Popup('popup-accept'); // попап для куки
popupAccept.setEventListener();

const popupCatInfo = new Popup('popup-cat-info'); // попап для информации о котике
popupCatInfo.setEventListener();

const catsInfoInstance = new CatsInfo('#cats-info-template', handleDeleteCat, handleEditCat, handleSaveCat); // экземпляр класса для вывода 
const catsInfoElement = catsInfoInstance.getElement();

// api.getAllCats().then((data) => { 
//     data.forEach(catData => {
//     createCat(catData);
//     })
// })

function serializeForm(elements) { // функция, которая принимает инпуты и введенные в них значения и возвращает объект с ключ-значение
    const formData = {};
   
    elements.forEach(input => {
        if (input.type === 'submit') return;

        if (input.type !== 'checkbox') {
                formData[input.name] = input.value;
        }
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    });
    return formData;
}

function setDataRefrash(minutes, key) { // функция ставит интервал обновления локал-стоража
    const setTime = new Date(new Date().getTime() + minutes * 60000)
    localStorage.setItem(key, setTime);
}

function createCat(dataCat) { // функция добавления кота
    const cardInstance = new Card(dataCat, '#card-template', handleCatTitle);
    const newCardElement = cardInstance.getElement();
    sectionCard.append(newCardElement);
}

function checkLocalStorage() { // проверяет нужно взять котов из базы или локалстоража
    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefrash');

    if (localData && localData.length && (new Date() < new Date(getTimeExpires))) {
        localData.forEach(catData => {
            createCat(catData);
            })
    } else {
        api.getAllCats().then((data) => { // берем котов с сервера
            data.forEach(catData => {
            createCat(catData);
            })
            updateLocalStorage(data, {type: 'ALL_CATS'});
        })

        
    }
}

function handleFormAddCat(e) {
    e.preventDefault() // не дает странице перезагрузиться 

    const elementsFromCat = [...formAddCat.elements]; // в массив распаковываем все элементы из пустой формы для добавления кота хтмл (инпуты)
    const dataFormCat = serializeForm(elementsFromCat); // к инпутам и введенным в них значениям применяем функцию для создания объекта с ключ-значение

    api.addNewCat(dataFormCat).then(() => { // берем котов с сервера
        createCat(dataFormCat);
        updateLocalStorage(dataFormCat, {type: 'ADD_CAT'});
    })
    //createCat(dataFormCat); // создаем кота, в качестве данных передаем полученные из формы ключи-значения
    
    popupAddCat.close(); // закрыть попап
    e.target.reset();
}

function handleFormAccept(e) { // добавление куки
    e.preventDefault()

    const acceptData = [...formAccept.elements];
    const serializeData = serializeForm(acceptData);

    if(serializeData.accept == true){
        Cookies.set('accept', 'true');
    }
    
    popupAccept.close();
}

function handleCatTitle(cardInstance) {
    catsInfoInstance.setData(cardInstance);
    popupCatInfo.setContent(catsInfoElement);
    popupCatInfo.open();
}

function handleDeleteCat(cardInstance) {

    api.deleteCatById(cardInstance.getId()).then(() => {
        cardInstance.deleteView();
        popupCatInfo.close();
        updateLocalStorage(cardInstance.getId(), {type: 'DELETE_CAT'});
    })
}

function handleEditCat() {
    catsInfoInstance.putData();
}

function handleSaveCat(cardInstance) {

    api.editCatById(cardInstance.getId()).then(() => { // берем котов с сервера
        const elementsForEdit = [...formEdit.elements]; // в массив распаковываем все элементы из пустой формы для добавления кота хтмл (инпуты)
        const dataEditCat = serializeForm(elementsForEdit); // к инпутам и введенным в них значениям применяем функцию для создания объекта с ключ-значение

        if (getName() !== dataEditCat.name) {
            getName() == dataEditCat.name
        }
    })
    updateLocalStorage(cardInstance.getId(), {type: 'EDIT_CAT'});
    this.buttonEdited.classList.toggle('cat-info__edited_hidden');
    this.buttonSaved.classList.toggle('cat-info__saved_hidden');
    popupCatInfo.close();
}

function updateLocalStorage(data, action) { // {type: 'ADD_CATS} - функция обновления локал стоража
    const oldStorage = JSON.parse(localStorage.getItem('cats'));

    switch (action.type) {
        case 'ADD_CAT':
            oldStorage.push(data);
            localStorage.setItem('cats', JSON.stringify(data));
            return;
        case 'ALL_CATS':
            localStorage.setItem('cats', JSON.stringify(data));
            setDataRefrash(5, 'catsRefrash');
            return;
        case 'DELETE_CAT':
            console.log('DELETE_CAT', data);
            const newStorage = oldStorage.filter(cat => cat.id !== data);
            localStorage.setItem('cats', JSON.stringify(newStorage));
            return;
        case 'EDIT_CAT':
            const updateStorage = oldStorage.map(cat => cat.id === data.id ? data : cat);
            localStorage.setItem('cats', JSON.stringify(updateStorage));
            return;
        default:
            break;
    }
}

checkLocalStorage();

btnOpenPopupForm.addEventListener('click', () => { // без согласия на обработку куки нельзя добавить котика
    if (Cookies.get('accept')) {
        popupAddCat.open();
    } else {
        popupAccept.open();
    }
});

formAddCat.addEventListener('submit', handleFormAddCat); // submit - отправка формы; при отправке формы попап закрывается, страница не перезагружается
formAccept.addEventListener('submit', handleFormAccept);



