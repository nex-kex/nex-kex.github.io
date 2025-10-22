document.querySelectorAll('input[name="option"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('installment-options').classList.add('hidden');
        document.getElementById('buy-options').classList.add('hidden');

        if (this.value === 'installment') {
            document.getElementById('installment-options').classList.remove('hidden');
        } else if (this.value === 'buy') {
            document.getElementById('buy-options').classList.remove('hidden');
        }
    });
});

function calculateTotal() {
    let quantityInput = document.getElementById('quantity');
    let productSelect = document.getElementById('product');
    let resultDiv = document.getElementById('result');
    let selectedOption = document.querySelector('input[name="option"]:checked').value;

    let quantity = parseInt(quantityInput.value);
    let price = parseInt(productSelect.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Пожалуйста, введите корректное количество товара (больше 0)');
        quantityInput.focus();
        return;
    }

    let totalCost = quantity * price;
    let resultText = '';

    let selectedProduct = productSelect.options[productSelect.selectedIndex];
    let productName = selectedProduct.text.split(' - ')[0];

    let formattedCost = totalCost.toLocaleString('ru-RU');

    if (selectedOption === 'calculate') {
        resultText = `
            Стоимость заказа: <span style="font-weight: bold;">${formattedCost} руб.</span><br>
            <small>${quantity} × ${productName} (${price.toLocaleString('ru-RU')} руб.)</small>
        `;
    } else if (selectedOption === 'installment') {
        let payments = parseInt(document.getElementById('payments').value);
        let monthlyPayment = Math.round(totalCost / payments);
        let formattedMonthly = monthlyPayment.toLocaleString('ru-RU');

        resultText = `
            Стоимость заказа: <span style="font-weight: bold;">${formattedCost} руб.</span><br>
            <small>${quantity} × ${productName} (${price.toLocaleString('ru-RU')} руб.)</small><br>
            Ежемесячный платёж: <span style="font-weight: bold;">${formattedMonthly} руб.</span>
        `;
    } else if (selectedOption === 'buy') {
        let storePayment = document.getElementById('store-payment').checked;

        if (!storePayment) {
            alert('К сожалению, сейчас доступна только оплата при получении.');
            return;
        }

        resultText = `
            Стоимость заказа: <span style="font-weight: bold;">${formattedCost} руб.</span><br>
            <small>${quantity} × ${productName} (${price.toLocaleString('ru-RU')} руб.)</small><br>
            <span style="color: #304e55; font-weight: bold;">Оплата в магазине при получении товара.</span>
        `;
    }

    resultDiv.innerHTML = resultText;
    resultDiv.classList.remove('hidden');
}

document.getElementById('quantity').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateTotal();
    }
});