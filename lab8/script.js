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

// Сохранение данных в LocalStorage
function saveFormData() {
    try {
        const formData = {
            fio: document.getElementById('fio').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('messageText').value,
            agreement: document.getElementById('agreement').checked
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
    }
}

// Очистка данных из LocalStorage
function clearFormData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Ошибка очистки данных:', error);
    }
}

// Показ сообщения
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

// Очистка сообщения
function clearMessage() {
    messageDiv.style.display = 'none';
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// Обработка отправки формы
feedbackForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(this);
        
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showMessage('Сообщение успешно отправлено!', 'success');
            feedbackForm.reset();
            clearFormData();
            
            // Автоматическое закрытие формы через 2 секунды
            setTimeout(() => {
                closeForm();
            }, 2000);
        } else {
            throw new Error('Ошибка отправки формы');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showMessage('Произошла ошибка при отправке. Попробуйте еще раз.', 'error');
    } finally {
        submitBtn.textContent = submitBtnText;
        submitBtn.disabled = false;
    }
});

// Автосохранение данных при изменении
feedbackForm.addEventListener('input', function() {
    saveFormData();
});

// Закрытие формы по клику на оверлей
popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
        closeForm();
    }
});

// Закрытие формы по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
        closeForm();
    }
});

// Проверка при загрузке страницы
window.addEventListener('load', function() {
    if (location.hash === '#feedback') {
        openForm();
    }
});
