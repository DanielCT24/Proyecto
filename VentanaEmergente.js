document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-popup');

    setTimeout(function() {
        popup.classList.add('show');
    }, 600); // Retraso de 3 segundos

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('show');
    });
});







/* ----------------------------------------TRANSICIÓN------------------------------------------------------------ */






document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const links = document.querySelectorAll('.transition-link');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            loader.classList.remove('hidden'); // Mostrar la animación de carga

            const targetUrl = this.href;

            // Usar setTimeout para dar tiempo a que la animación se muestre antes de la redirección
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 100);
        });
    });

    window.addEventListener('load', function() {
        loader.classList.add('hidden'); // Ocultar la animación de carga cuando la página esté completamente cargada
    });
});

