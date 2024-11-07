let productCount = 1;

function updatePrice(productId) {
    var productSelect = document.getElementById(`product-select-${productId}`);
    var selectedOption = productSelect.options[productSelect.selectedIndex];
    var price = selectedOption.getAttribute('data-price');
    document.getElementById(`price-${productId}`).textContent = price ? price : 0;
    calculateTotal();
}

function calculateTotal() {
    var grandTotal = 0;
    for (var i = 1; i <= productCount; i++) {
        var price = document.getElementById(`price-${i}`).textContent;
        var quantity = document.getElementById(`quantity-${i}`).value;
        grandTotal += price * quantity;
    }
    document.getElementById('grand-total').textContent = grandTotal;
}

function addProduct() {
    productCount++;
    var productSelections = document.getElementById('product-selections');
    var newProductHtml = `
        <div class="product-item">
            <label for="product-select-${productCount}">Choose a product:</label>
            <select id="product-select-${productCount}" onchange="updatePrice(${productCount})">
                <option value="0" data-price="0">Select a drip...</option>
                <option value="Weight Loss Fat Burner Drip (200ml)" data-price="490">Weight Loss Fat Burner Drip (200ml) - R490</option>
                <option value="Weight Loss Fat Burner Drip (1l)" data-price="980">Weight Loss Fat Burner Drip (1l) - R980</option>
                <option value="Immune Boost Drip (200ml)" data-price="450">Immune Boost Drip (200ml) - R450</option>
                <option value="Immune Boost Drip (1l)" data-price="800">Immune Boost Drip (1l) - R800</option>
                <option value="Jet Fuel Drip (200ml)" data-price="900">Jet Fuel Drip (200ml) - R900</option>
                <option value="Jet Fuel Drip (1l)" data-price="1100">Jet Fuel Drip (1l) - R1100</option>
                 <option value="Rehydration Drip (200ml)" data-price="250">Rehydration Drip (200ml) - R250</option>
                    <option value="Rehydration Drip (1l)" data-price="300">Rehydration Drip (1l) - R300</option>
                    <option value="Detox Drip (200ml)" data-price="500">Detox Drip (200ml) - R500</option>
                    <option value="Detox Drip (1l)" data-price="800">Detox Drip (1l) - R800</option>
                    <option value="Multi-Vitamin Drip (200ml)" data-price="1000">Multi-Vitamin Drip (200ml) - R1000</option>
                    <option value="Multi-Vitamin Drip (1l)" data-price="18000">Multi-Vitamin Drip (1l) - R18000</option>
                    <option value="Sport Vitality & Recovery Drip (200ml)" data-price="800">Sport Vitality & Recovery Drip (200ml) - R800</option>
                    <option value="Sport Vitality & Recovery Drip (1l)" data-price="1100">Sport Vitality & Recovery Drip (1l) - R1100</option>
                    <option value="Hangover & Jet Lag Drip (200ml)" data-price="1000">Hangover & Jet Lag Drip (200ml) - R1000</option>
                    <option value="Hangover & Jet Lag Drip (1l)" data-price="1050">Hangover & Jet Lag Drip (1l) - R1050</option>
                    <option value="Menopause Assist Drip (200ml)" data-price="1100">Menopause Assist Drip (200ml) - R1100</option>
                    <option value="Menopause Assist Drip (1l)" data-price="1200">Menopause Assist Drip (1l) - R1200</option>
                    <option value="Libido Drip" disabled>Libido Drip (COMING SOON)</option>
                    <option value="Menstrual Assist Drip" disabled>Menstrual Assist Drip (COMING SOON)</option>
            </select>

            <label for="quantity-${productCount}">Quantity:</label>
            <input type="number" id="quantity-${productCount}" value="1" min="1" onchange="calculateTotal()">

            <p>Price: R<span id="price-${productCount}">0</span></p>
        </div>
    `;
    productSelections.insertAdjacentHTML('beforeend', newProductHtml);
}

function proceedToCheckout() {
    var grandTotal = document.getElementById('grand-total').textContent;
    localStorage.setItem('grandTotal', grandTotal);
    window.location.href = 'checkout.html';
}


