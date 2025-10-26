document.addEventListener('DOMContentLoaded', function() {
    const galleryTrack = document.getElementById('galleryTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageInfo = document.getElementById('pageInfo');
    const pagerDots = document.getElementById('pagerDots');

    const items = document.querySelectorAll('.gallery-item');
    const totalItems = items.length;

    // Создаем клоны для бесконечной прокрутки
    function createClones() {
        // Клонируем последние 3 элемента и добавляем в начало
        for (let i = totalItems - 3; i < totalItems; i++) {
            const clone = items[i].cloneNode(true);
            galleryTrack.insertBefore(clone, galleryTrack.firstChild);
        }

        // Клонируем первые 3 элемента и добавляем в конец
        for (let i = 0; i < 3; i++) {
            const clone = items[i].cloneNode(true);
            galleryTrack.appendChild(clone);
        }
    }

    // Определяем количество видимых элементов
    function getVisibleItemsCount() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    let visibleItems = getVisibleItemsCount();
    let currentIndex = 0; // Текущий центральный индекс
    let totalPages = totalItems;

    // Создаем точки-индикаторы
    function createPagerDots() {
        pagerDots.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pager-dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToIndex(i);
            });
            pagerDots.appendChild(dot);
        }
    }

    // Обновляем информацию о странице
    function updatePageInfo() {
        pageInfo.textContent = `Страница ${currentIndex + 1} из ${totalPages}`;

        // Обновляем активную точку
        document.querySelectorAll('.pager-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Переход к определенному индексу
    function goToIndex(index) {
        currentIndex = index;
        updateGalleryPosition();
        updatePageInfo();
    }

    // Обновляем позицию галереи
    function updateGalleryPosition() {
        // Смещение учитывает клоны в начале (3 элемента)
        const offset = -currentIndex * (100 / visibleItems) - (100 / visibleItems) * 3;
        galleryTrack.style.transform = `translateX(${offset}%)`;
    }

    // Переход к следующему изображению
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGalleryPosition();
        updatePageInfo();
    }

    // Переход к предыдущему изображению
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGalleryPosition();
        updatePageInfo();
    }

    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        const newVisibleItems = getVisibleItemsCount();
        if (newVisibleItems !== visibleItems) {
            visibleItems = newVisibleItems;
            updateGalleryPosition();
        }
    });

    // Инициализация
    createClones();
    createPagerDots();
    updateGalleryPosition();
    updatePageInfo();
});