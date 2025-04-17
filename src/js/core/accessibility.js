let carruseles = [];
let carruselIndex = 0;
let cardIndex = 0;
let enBuscador = false;

// Función para verificar si hay un carrusel de episodios activo y visible
function hayCarruselDeEpisodios() {
    const carruselEpisodios = document.querySelector('#episodios');
    if (!carruselEpisodios) return false;
    const cards = carruselEpisodios.querySelectorAll('.episode-card');
    return cards.length > 0 && getComputedStyle(carruselEpisodios).display !== 'none';
}

function actualizarFoco() {
    // Limpiar el foco previo
    document.querySelectorAll('.card-selected').forEach(card => {
        card.classList.remove('card-selected');
        card.setAttribute('tabindex', '-1');
    });

    if (enBuscador) {
        const input = document.getElementById('searchInput');
        if (input) input.focus();
        return;
    }

    const carrusel = carruseles[carruselIndex];
    if (!carrusel) return;

    const cards = carrusel.querySelectorAll('.video-card, .series-card, .channel-card, .episode-card');
    if (cards.length === 0) return;

    // Asegurar que el índice esté dentro del rango válido
    if (cardIndex >= cards.length) {
        cardIndex = cards.length - 1;
    }

    const card = cards[cardIndex];
    if (!card) return;

    card.classList.add('card-selected');
    card.setAttribute('tabindex', '0');
    card.focus();

    const rectPadre = carrusel.getBoundingClientRect();
    const rectCard = card.getBoundingClientRect();

    if (rectCard.left < rectPadre.left) {
        carrusel.scrollLeft -= carrusel.offsetWidth / 1.2;
    } else if (rectCard.right > rectPadre.right) {
        carrusel.scrollLeft += carrusel.offsetWidth / 1.2;
    }
}

function activarCard() {
    const card = document.querySelector('.card-selected');
    if (!card) return;
    const boton = card.querySelector('button, a');
    if (boton) boton.click();
    else card.click();
}

function handleKeydown(e) {
    const carrusel = carruseles[carruselIndex];
    const cards = carrusel ? carrusel.querySelectorAll('.video-card, .series-card, .channel-card, .episode-card') : [];

    switch (e.key) {
        case 'ArrowRight':
            e.preventDefault();
            if (cardIndex < cards.length - 1) {
                cardIndex++;
            } else {
                const target = carrusel.dataset.target || carrusel.id;
                const btnNext = document.querySelector(`.carousel-right[data-target="${target}"]`);
                if (btnNext) btnNext.click();
                cardIndex = cards.length - 1; // Asegura que no se pase
            }
            break;

        case 'ArrowLeft':
            e.preventDefault();
            if (cardIndex > 0) {
                cardIndex--;
            } else {
                const target = carrusel.dataset.target || carrusel.id;
                const btnPrev = document.querySelector(`.carousel-left[data-target="${target}"]`);
                if (btnPrev) btnPrev.click();
                cardIndex = 0; // No ir más allá
            }
            break;

        case 'ArrowDown':
            e.preventDefault();

            if (enBuscador) {
                enBuscador = false;
                carruselIndex = 0;
                cardIndex = 0;
                break;
            }

            if (carruselIndex >= carruseles.length - 1) {
                if (hayCarruselDeEpisodios()) {
                    carruselIndex++;
                    cardIndex = 0;
                } else {
                    carruselIndex = 0;
                    cardIndex = 0;
                }
            } else {
                carruselIndex++;
                cardIndex = 0;
            }
            break;

        case 'ArrowUp':
            e.preventDefault();

            if (carruselIndex === 0) {
                enBuscador = true;
                carruselIndex = -1;
                break;
            }

            carruselIndex--;
            cardIndex = 0;
            break;

        case 'Enter':
            e.preventDefault();
            activarCard();
            return;

        case 'Escape':
            e.preventDefault();
            if (enBuscador) {
                enBuscador = false;
                carruselIndex = 0;
                cardIndex = 0;
            } else {
                const modal = document.querySelector('.modal.visible');
                if (modal) modal.classList.remove('visible');
            }
            break;
    }

    actualizarFoco();
}

// Cargar carruseles + listeners
window.addEventListener('DOMContentLoaded', () => {
    const baseCarruseles = Array.from(document.querySelectorAll('.carousel-content'));
    const carruselEpisodios = document.querySelector('#episodios');

    carruseles = [...baseCarruseles];
    if (carruselEpisodios) carruseles.push(carruselEpisodios);

    actualizarFoco();
    document.addEventListener('keydown', handleKeydown);

    document.addEventListener('click', (e) => {
        const isCard = e.target.closest('.video-card, .series-card, .channel-card, .episode-card');
        if (!isCard) actualizarFoco();
    });
});
