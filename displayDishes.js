// displayDishes.js

// Глобальная переменная — доступна из order.js
window.dishes = [];

async function loadDishes() {
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Ошибка загрузки');
        window.dishes = await response.json();
        renderAllSections();
    } catch (err) {
        console.error('❌ Не удалось загрузить блюда:', err);
    }
}

function renderAllSections() {
    document.querySelectorAll('.menu-section').forEach(section => {
        const title = section.querySelector('h2')?.textContent || '';
        let cat = '';
        if (/суп/i.test(title)) cat = 'soup';
        else if (/главное/i.test(title)) cat = 'main';
        else if (/салат|стартер/i.test(title)) cat = 'starter';
        else if (/напиток/i.test(title)) cat = 'drink';
        else if (/десерт/i.test(title)) cat = 'dessert';

        const grid = section.querySelector('.dishes-grid');
        const filtered = window.dishes.filter(d => d.category === cat);
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        renderDishes(filtered, grid);

        // Фильтры
        const filters = section.querySelector('.filters');
        if (filters) {
            const buttons = filters.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.addEventListener('click', function () {
                    const kind = this.dataset.kind;
                    buttons.forEach(b => b.classList.remove('active'));
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                        renderDishes(filtered, grid);
                    } else {
                        this.classList.add('active');
                        const f = filtered.filter(d => d.kind === kind);
                        renderDishes(f, grid);
                    }
                });
            });
        }
    });
}

function renderDishes(list, container) {
    container.innerHTML = '';
    list.forEach(d => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.dataset.dish = d.keyword;
        card.innerHTML = `
            <img src="${d.image}" alt="${d.name}">
            <p class="price">${d.price} ₽</p>
            <p class="name">${d.name}</p>
            <p class="weight">${d.count}</p>
            <button class="add-btn">Добавить</button>
        `;
        card.addEventListener('click', () => addToOrder(d.keyword));
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadDishes);