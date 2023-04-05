// 1 Сделать свой стиль и создать проект
// 2 Перебрать массив котов и отобразить их на странице

const btnOpenPopupForm = document.querySelector('#add'); // кнопка добавления кота в хэдере
const formAddCat = document.querySelector('#popup-form-cat'); // форма с инпутами для добавления кота из хтмл (пустая)
const formAccept = document.querySelector('#popup-form-accept');
const sectionCard = document.querySelector('.cards'); // пустая секция для котов

const popupAddCat = new Popup("popup-add-cats"); // попап для добавления кота (из файла popup.js)
popupAddCat.setEventListener(); // слушатель на открытом попапе для его закрытия

const popupAccept = new Popup('popup-accept'); // попап для куки
popupAccept.setEventListener();

const popupCatInfo = new Popup('popup-cat-info'); // попап для информации о котике
popupCatInfo.setEventListener();

const catsInfoInstance = new CatsInfo('#cats-info-template', handleDeleteCat); // экземпляр класса для вывода 
const catsInfoElement = catsInfoInstance.getElement();

// cats.forEach(catData => createCat(catData)); // берем котов из cats.js

api.getAllCats().then((data) => { // берем котов с сервера
    data.forEach(catData => {
    createCat(catData);
    })
})

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

function createCat(dataCat) { // функция добавления кота
    const cardInstance = new Card(dataCat, '#card-template', handleCatTitle);
    const newCardElement = cardInstance.getElement();
    sectionCard.append(newCardElement);
}

function handleFormAddCat(e) {
    e.preventDefault() // не дает странице перезагрузиться 

    const elementsFromCat = [...formAddCat.elements]; // в массив распаковываем все элементы из пустой формы для добавления кота хтмл (инпуты)
    const dataFormCat = serializeForm(elementsFromCat); // к инпутам и введенным в них значениям применяем функцию для создания объекта с ключ-значение
    
    api.addNewCat(dataFormCat).then(() => { // берем котов с сервера
        createCat(dataFormCat);
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
        console.log('popupCatInfo.close()', popupCatInfo.close);
    })

   
}

btnOpenPopupForm.addEventListener('click', () => { // без согласия на обработку куки нельзя добавить котика
    if (Cookies.get('accept')) {
        popupAddCat.open();
    } else {
        popupAccept.open();
    }
});

formAddCat.addEventListener('submit', handleFormAddCat); // submit - отправка формы; при отправке формы попап закрывается, страница не перезагружается
formAccept.addEventListener('submit', handleFormAccept);



