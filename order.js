// order.js

let selectedOrder = {
    soup: null,
    main: null,
    starter: null,
    drink: null,
    dessert: null
};

function addToOrder(keyword) {
    console.log('🔍 Клик по блюду с keyword:', keyword);

    const dish = window.dishes.find(d => d.keyword === keyword);
    if (!dish) {
        console.error('❌ Блюдо не найдено:', keyword);
        return;
    }

    console.log('✅ Найдено блюдо:', dish);

    // Приводим category к нужному формату
    let categoryKey = '';
    switch (dish.category) {
        case 'soup': categoryKey = 'soup'; break;
        case 'main-course': categoryKey = 'main'; break;
        case 'salad': categoryKey = 'starter'; break;
        case 'drink': categoryKey = 'drink'; break;
        case 'dessert': categoryKey = 'dessert'; break;
        default: categoryKey = ''; break;
    }

    if (!categoryKey) {
        console.warn('⚠️ Неизвестная категория:', dish.category);
        return;
    }

    selectedOrder[categoryKey] = dish;

    console.log('📦 Обновленный заказ:', selectedOrder);

    updateOrderDisplay();
}

function updateOrderDisplay() {
    const oc = document.querySelector('.order-column');
    const sD = oc.querySelector('#soup-display');
    const mD = oc.querySelector('#main-display');
    const stD = oc.querySelector('#starter-display');
    const drD = oc.querySelector('#drink-display');
    const deD = oc.querySelector('#dessert-display');
    const tD = oc.querySelector('#total-display');

    sD.textContent = selectedOrder.soup ? `${selectedOrder.soup.name} ${selectedOrder.soup.price}₽` : 'Блюдо не выбрано';
    mD.textContent = selectedOrder.main ? `${selectedOrder.main.name} ${selectedOrder.main.price}₽` : 'Блюдо не выбрано';
    stD.textContent = selectedOrder.starter ? `${selectedOrder.starter.name} ${selectedOrder.starter.price}₽` : 'Блюдо не выбрано';
    drD.textContent = selectedOrder.drink ? `${selectedOrder.drink.name} ${selectedOrder.drink.price}₽` : 'Напиток не выбран';
    deD.textContent = selectedOrder.dessert ? `${selectedOrder.dessert.name} ${selectedOrder.dessert.price}₽` : 'Десерт не выбран';

    const hasSel = selectedOrder.soup || selectedOrder.main || selectedOrder.starter || selectedOrder.drink || selectedOrder.dessert;

    oc.querySelector('#soup-header').style.display = hasSel ? 'block' : 'none';
    oc.querySelector('#main-header').style.display = hasSel ? 'block' : 'none';
    oc.querySelector('#starter-header').style.display = hasSel ? 'block' : 'none';
    oc.querySelector('#drink-header').style.display = hasSel ? 'block' : 'none';
    oc.querySelector('#dessert-header').style.display = hasSel ? 'block' : 'none';
    oc.querySelector('#total-header').style.display = hasSel ? 'block' : 'none';

    if (hasSel) {
        let total = 0;
        if (selectedOrder.soup) total += selectedOrder.soup.price;
        if (selectedOrder.main) total += selectedOrder.main.price;
        if (selectedOrder.starter) total += selectedOrder.starter.price;
        if (selectedOrder.drink) total += selectedOrder.drink.price;
        if (selectedOrder.dessert) total += selectedOrder.dessert.price;
        tD.textContent = `${total}₽`;
    } else {
        tD.textContent = '';
    }
}