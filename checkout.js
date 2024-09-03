document.addEventListener('DOMContentLoaded', function() {
    const checkoutContent = document.querySelector('.checkout-content');
    const totalElem = document.querySelector('.checkout-footer .total');
    const emptyCartButton = document.querySelector('.empty-cart-button');
    const payButton = document.querySelector('.pay-button');

    function updateCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        checkoutContent.innerHTML = '';

        let grandTotal = 0;

        cart.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h2>${item.name}</h2>
                    <p class="price">S/ ${item.price.toFixed(2)}</p>
                    <p>Cantidad: <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}"></p>
                    <p class="total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-button" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            checkoutContent.appendChild(itemCard);

            grandTotal += item.price * item.quantity;
        });

        totalElem.textContent = `Total: S/ ${grandTotal.toFixed(2)}`;
    }

    function handleCartUpdates(event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout();
            }
        }

        if (event.target.classList.contains('remove-button')) {
            const id = event.target.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCheckout();
        }
    }

    function handleButtonActions(event) {
        if (event.target === emptyCartButton) {
            localStorage.removeItem('cart');
            updateCheckout();
        }

        if (event.target === payButton) {
            // Aquí iría el código para manejar el pago
            alert('Proceso de pago en desarrollo.');
        }
    }

    checkoutContent.addEventListener('input', handleCartUpdates);
    checkoutContent.addEventListener('click', handleCartUpdates);
    document.addEventListener('click', handleButtonActions);

    updateCheckout();
});



document.getElementById('validateCoupon').addEventListener('click', function() {
    var coupon = document.getElementById('coupon').value;
    if (coupon === "") {
        alert('Cupón no ingresado. Continuar sin descuento.');
    } else {
        alert('Cupón inválido. Intente con otro.');
    }
});

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    var terms = document.getElementById('terms').checked;
    var privacy = document.getElementById('privacy').checked;

    if (!terms || !privacy) {
        event.preventDefault();
        alert('Debe aceptar los términos y condiciones y la política de privacidad.');
    }
});





/* -DETALLES DEL CARRITO */

document.addEventListener('DOMContentLoaded', function() {
    const summaryItemsElement = document.getElementById('summaryItems');
    const summaryTotalElem = document.getElementById('summaryTotal');

    function updateCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        summaryItemsElement.innerHTML = '';
        
        let grandTotal = 0;

        cart.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('summary-item');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-price">Precio: S/ ${item.price.toFixed(2)}</p>
                    <p class="item-quantity">Cantidad: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
                    <p class="item-total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            summaryItemsElement.appendChild(itemCard);

            grandTotal += item.price * item.quantity;
        });

        summaryTotalElem.textContent = `Total: S/ ${grandTotal.toFixed(2)}`;
    }

    function handleCartUpdates(event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout();
            }
        }
    }

    // Escuchar cambios en el input de cantidad
    document.querySelector('.order-summary').addEventListener('input', handleCartUpdates);

    // Escuchar cambios en el localStorage (para actualización automática desde otras partes de la app)
    window.addEventListener('storage', function(event) {
        if (event.key === 'cart') {
            updateCheckout();
        }
    });

    // Inicializar
    updateCheckout();
});










document.querySelector('form').addEventListener('submit', function(e) {
    const selected = document.querySelector('input[name="delivery"]:checked');
    if (!selected) {
        e.preventDefault(); // Previene el envío del formulario
        alert('Por favor, selecciona una opción de envío.');
    }
});








/*------------------ YAPE------------------- */

// Obtener el modal
var modal = document.getElementById("yapeModal");

// Obtener el radio button de Yape
var yapeRadioButton = document.getElementById("yape");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario selecciona el radio button de Yape
yapeRadioButton.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, lo cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





// Obtener los elementos necesarios
var fileInput = document.getElementById('comprobanteInput');
var uploadButton = document.querySelector('.upload-button');

// Escuchar el cambio en el input de archivo
fileInput.onchange = function(event) {
    // Obtener el archivo seleccionado
    var file = event.target.files[0];

    // Verificar si se seleccionó un archivo
    if (file) {
        // Cambiar el texto del botón para mostrar el nombre del archivo
        uploadButton.innerHTML =  file.name;
    }
};


/* ---------------GUARDA LOS DATOS----------------------- */
// Función para guardar los datos en localStorage
function saveFormData() {
    var operationNumber = document.getElementById('operationNumber').value;
    var confirmOperationNumber = document.getElementById('confirmOperationNumber').value;
    var operationDate = document.getElementById('operationDate').value;
    
    localStorage.setItem('operationNumber', operationNumber);
    localStorage.setItem('confirmOperationNumber', confirmOperationNumber);
    localStorage.setItem('operationDate', operationDate);
}

// Evitar el envío del formulario y guardar los datos cuando se haga clic en "Finalizar"
document.getElementById('yapeForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el envío del formulario
    saveFormData();  // Guarda los datos en localStorage
    alert('Datos guardados correctamente. Puedes cerrar esta ventana y continuar.');
});

// Cargar los datos guardados cuando se carga la página o se abre el modal
window.onload = function() {
    if (localStorage.getItem('operationNumber')) {
        document.getElementById('operationNumber').value = localStorage.getItem('operationNumber');
    }

    if (localStorage.getItem('confirmOperationNumber')) {
        document.getElementById('confirmOperationNumber').value = localStorage.getItem('confirmOperationNumber');
    }

    if (localStorage.getItem('operationDate')) {
        document.getElementById('operationDate').value = localStorage.getItem('operationDate');
    }
};


// Función para cerrar el modal
function closeModal() {
    var modal = document.getElementById('yapeModal');
    modal.style.display = "none";
}

// Asignar el evento de cierre al botón "Finalizar"
document.querySelector('.finalize-button').addEventListener('click', function() {
    closeModal();  // Cierra el modal
    saveFormData();  // Guarda los datos en localStorage
    closeModal();  // Cierra el modal
});







/* ---------------------------------PAYPAL----------------------- */

function updateCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    summaryItemsElement.innerHTML = '';

    let grandTotal = 0;

    cart.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('summary-item');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-price">Precio: S/ ${item.price.toFixed(2)}</p>
                <p class="item-quantity">Cantidad: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
                <p class="item-total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        summaryItemsElement.appendChild(itemCard);

        grandTotal += item.price * item.quantity;
    });

    summaryTotalElem.textContent = `S/ ${grandTotal.toFixed(2)}`;

    // Guardar el total en localStorage
    localStorage.setItem('orderTotal', grandTotal.toFixed(2));
}
