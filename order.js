// order.js

let selectedOrder = {
    soup: null,
    main: null,
    starter: null,
    drink: null,
    dessert: null
};

function addToOrder(keyword) {
    const dish = window.dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    selectedOrder[dish.category] = dish;
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderContainer = document.querySelector('.order-column');
    const soupDisplay = orderContainer.querySelector('#soup-display');
    const mainDisplay = orderContainer.querySelector('#main-display');
    const starterDisplay = orderContainer.querySelector('#starter-display');
    const drinkDisplay = orderContainer.querySelector('#drink-display');
    const dessertDisplay = orderContainer.querySelector('#dessert-display');
    const totalDisplay = orderContainer.querySelector('#total-display');

    soupDisplay.textContent = selectedOrder.soup ? `${selectedOrder.soup.name} ${selectedOrder.soup.price}₽` : 'Блюдо не выбрано';
    mainDisplay.textContent = selectedOrder.main ? `${selectedOrder.main.name} ${selectedOrder.main.price}₽` : 'Блюдо не выбрано';
    starterDisplay.textContent = selectedOrder.starter ? `${selectedOrder.starter.name} ${selectedOrder.starter.price}₽` : 'Блюдо не выбрано';
    drinkDisplay.textContent = selectedOrder.drink ? `${selectedOrder.drink.name} ${selectedOrder.drink.price}₽` : 'Напиток не выбран';
    dessertDisplay.textContent = selectedOrder.dessert ? `${selectedOrder.dessert.name} ${selectedOrder.dessert.price}₽` : 'Десерт не выбран';

    const hasAnySelection = selectedOrder.soup || selectedOrder.main || selectedOrder.starter || selectedOrder.drink || selectedOrder.dessert;

    const soupHeader = orderContainer.querySelector('#soup-header');
    const mainHeader = orderContainer.querySelector('#main-header');
    const starterHeader = orderContainer.querySelector('#starter-header');
    const drinkHeader = orderContainer.querySelector('#drink-header');
    const dessertHeader = orderContainer.querySelector('#dessert-header');
    const totalHeader = orderContainer.querySelector('#total-header');

    if (hasAnySelection) {
        soupHeader.style.display = 'block';
        mainHeader.style.display = 'block';
        starterHeader.style.display = 'block';
        drinkHeader.style.display = 'block';
        dessertHeader.style.display = 'block';
        totalHeader.style.display = 'block';

        let total = 0;
        if (selectedOrder.soup) total += selectedOrder.soup.price;
        if (selectedOrder.main) total += selectedOrder.main.price;
        if (selectedOrder.starter) total += selectedOrder.starter.price;
        if (selectedOrder.drink) total += selectedOrder.drink.price;
        if (selectedOrder.dessert) total += selectedOrder.dessert.price;

        totalDisplay.textContent = `${total}₽`;
    } else {
        soupHeader.style.display = 'none';
        mainHeader.style.display = 'none';
        starterHeader.style.display = 'none';
        drinkHeader.style.display = 'none';
        dessertHeader.style.display = 'none';
        totalHeader.style.display = 'none';
        totalDisplay.textContent = '';
    }
}