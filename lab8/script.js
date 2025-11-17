// Конфигурация
const FORM_ENDPOINT = 'https://formcarry.com/s/AbhoJuYk4gN'; 
const STORAGE_KEY = 'feedback_form_data';

// Элементы DOM
const popupOverlay = document.getElementById('popupOverlay');
const feedbackForm = document.getElementById('feedbackForm');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

// Открытие формы
function openForm() {
    popupOverlay.style.display = 'flex';
    history.pushState({ formOpen: true }, '', '#feedback');
    loadFormData();
}

// Закрытие формы
function closeForm() {
    popupOverlay.style.display = 'none';
    history.back();
    clearMessage();
}

// Обработчик нажатия кнопки "Назад"
window.addEventListener('popstate', function(event) {
    if (location.hash !== '#feedback') {
        popupOverlay.style.display = 'none';
        clearMessage();
    }
});

// Загрузка данных из LocalStorage
function loadFormData() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('fio').value = formData.fio || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('messageText').value = formData.message || '';
            document.getElementById('agreement').checked = formData.agreement || false;
        }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}
