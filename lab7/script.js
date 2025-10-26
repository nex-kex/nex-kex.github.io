document.addEventListener('DOMContentLoaded', function() {
    const galleryTrack = document.getElementById('galleryTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageInfo = document.getElementById('pageInfo');
    const pagerDots = document.getElementById('pagerDots');

    const items = document.querySelectorAll('.gallery-item');
    const totalItems = items.length;

    // Определяем количество видимых элементов в зависимости от ширины экрана
    function getVisibleItemsCount() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    let visibleItems = getVisibleItemsCount();
    let currentPage = 0;
    let totalPages = Math.ceil(totalItems / visibleItems);

    // Для 8 изображений и 3 видимых за раз: 8/3 = 2.67 → 3 страницы
    // Страница 0: изображения 0,1,2
    // Страница 1: изображения 3,4,5
    // Страница 2: изображения 6,7

    // Создаем точки-индикаторы
    function createPagerDots() {
        pagerDots.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pager-dot');
            if (i === currentPage) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            pagerDots.appendChild(dot);
        }
    }

    // Обновляем информацию о странице
    function updatePageInfo() {
        pageInfo.textContent = `Страница ${currentPage + 1} из ${totalPages}`;

        // Обновляем активную точку
        document.querySelectorAll('.pager-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    // Переход к определенной странице
    function goToPage(page) {
        currentPage = page;
        const offset = -currentPage * (100 / visibleItems) * visibleItems;
        galleryTrack.style.transform = `translateX(${offset}%)`;
        updatePageInfo();
    }

    // Переход к следующей странице
    function nextPage() {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        } else {
            goToPage(0); // Возврат к первой странице
        }
    }

    // Переход к предыдущей странице
    function prevPage() {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        } else {
            goToPage(totalPages - 1); // Переход к последней странице
        }
    }

    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        const newVisibleItems = getVisibleItemsCount();
        if (newVisibleItems !== visibleItems) {
            visibleItems = newVisibleItems;
            totalPages = Math.ceil(totalItems / visibleItems);
            createPagerDots();
            // Сохраняем текущую позицию или переходим к ближайшей странице
            const newCurrentPage = Math.min(currentPage, totalPages - 1);
            goToPage(newCurrentPage);
        }
    });

    // Инициализация
    createPagerDots();
    updatePageInfo();

    // Автопрокрутка (опционально)
    // setInterval(nextPage, 5000);
});