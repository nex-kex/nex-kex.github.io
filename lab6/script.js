function calculateTotal() {
    let quantityInput = document.getElementById('quantity');
    let productSelect = document.getElementById('product');
    let resultDiv = document.getElementById('result');
    let selectedOption = document.querySelector('input[name="option"]:checked').value;

    let quantity = parseInt(quantityInput.value);
    let price = parseInt(productSelect.value);

    if (isNaN(quantity) || quantity <= 0) {
        resultDiv.classList.add('hidden');
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

        resultText = `
            Стоимость заказа: <span style="font-weight: bold;">${formattedCost} руб.</span><br>
            <small>${quantity} × ${productName} (${price.toLocaleString('ru-RU')} руб.)</small><br>
            <span style="color: #304e55; font-weight: bold;">${storePayment ? 'Оплата в магазине при получении товара.' : 'Оплата онлайн сейчас недоступна.'}</span>
        `;
    }

    resultDiv.innerHTML = resultText;
    resultDiv.classList.remove('hidden');
}

function toggleOptions() {
    let selectedOption = document.querySelector('input[name="option"]:checked').value;
    
    const installmentOptions = document.getElementById('installment-options');
    const buyOptions = document.getElementById('buy-options');
    installmentOptions.classList.add('hidden');
    buyOptions.classList.add('hidden');

    if (selectedOption === 'installment') {
        installmentOptions.classList.remove('hidden');
    } else if (selectedOption === 'buy') {
        buyOptions.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener('change', function() {
            toggleOptions();
            calculateTotal();
        });
    });

    document.getElementById('quantity').addEventListener('input', calculateTotal);
    document.getElementById('quantity').addEventListener('change', calculateTotal);

    document.getElementById('product').addEventListener('change', calculateTotal);

    document.getElementById('payments').addEventListener('change', calculateTotal);

    document.getElementById('store-payment').addEventListener('change', calculateTotal);

    toggleOptions();
    calculateTotal();
});
