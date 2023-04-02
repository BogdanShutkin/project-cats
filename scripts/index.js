// 1 Сделать свой стиль и создать проект
// 2 Перебрать массив котов и отобразить их на странице

const btnOpenPopupForm = document.querySelector('#add'); // кнопка добавления кота в хэдере
const formAddCat = document.querySelector('#popup-form-cat'); // форма с инпутами для добавления кота из хтмл (пустая)
const sectionCard = document.querySelector('.cards'); // пустая секция для котов

const popupAddCat = new Popup("popup-add-cats"); // попап для добавления кота (из файла popup.js)
popupAddCat.setEventListener(); // слушатель на открытом попапе для его закрытия


// cats.forEach(catData => {
//     const cat = new Card(catData, '#card-template') // класс в файле card.js; catData - объекты с котиками из файла card.js; айди card-template - форма карточки в хтмл
//     const firstCat = cat.getElement() // сохраняем в переменную склонированный из БД элемент (кот)
//     sectionCard.append(firstCat); // добавляем созданного кота в секцию
// }); // перебрали массив котов и запушили

cats.forEach(catData => createCat(catData)); // перебрали массив котов и запушили новой функцией (вместо куска кода сверху)

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
    const cardInstance = new Card(dataCat, '#card-template');
    const newCardElement = cardInstance.getElement();
    sectionCard.append(newCardElement);
}

function handleFormAddCat(e) {
    e.preventDefault() // не дает странице перезагрузиться 

    const elementsFromCat = [...formAddCat.elements]; // в массив распаковываем все элементы из пустой формы для добавления кота хтмл (инпуты)
    const dataFormCat = serializeForm(elementsFromCat); // к инпутам и введенным в них значениям применяем функцию для создания объекта с ключ-значение
    createCat(dataFormCat); // создаем кота, в качестве данных передаем полученные из формы ключи-значения
    
    popupAddCat.close(); // закрыть попап
}


btnOpenPopupForm.addEventListener('click', () => popupAddCat.open()); // повесили на кнопку слушателя, который открывает попап при клике
formAddCat.addEventListener('submit', handleFormAddCat); // submit - отправка формы; при отправке формы попап закрывается, страница не перезагружается
