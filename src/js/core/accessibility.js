let carruseles = [];
let carruselIndex = 0;
let cardIndex = 0;
let enBuscador = false;

// Devuelve todos los carruseles visibles con al menos una card
function obtenerCarruselesVisibles() {
    const carruselesDOM = Array.from(document.querySelectorAll('.carousel-content, #episodios'));
    return carruselesDOM.filter(carrusel => {
        const isVisible = getComputedStyle(carrusel).display !== 'none';
        const tieneCards = carrusel.querySelectorAll('.video-card, .series-card, .channel-card, .episode-card').length > 0;
        return isVisible && tieneCards;
    });
}

function actualizarCarruseles() {
    carruseles = obtenerCarruselesVisibles();
    if (carruselIndex >= carruseles.length) {
        carruselIndex = 0;
    }
}

function actualizarFoco() {
    actualizarCarruseles();

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
    if (cardIndex >= cards.length) cardIndex = cards.length - 1;

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
    actualizarCarruseles();

    const carrusel = carruseles[carruselIndex];

    const cards = carrusel ? carrusel.querySelectorAll('.video-card, .series-card, .channel-card, .episode-card') : [];

    switch (e.key) {
        case 'ArrowRight':
            e.preventDefault();
            if (cardIndex < cards.length - 1) {
                cardIndex++;
            } else if (carrusel) {
                const target = carrusel.dataset.target || carrusel.id;
                const btnNext = document.querySelector(`.carousel-right[data-target="${target}"]`);
                if (btnNext) {
                    if (cards.length > 4) {
                        btnNext.click();
                        cardIndex = cards.length - 1;
                    }
                }
            }
            break;
        
        case 'ArrowLeft':
            e.preventDefault();
            if (cardIndex > 0) {
                cardIndex--;
            } else if (carrusel) {
                const target = carrusel.dataset.target || carrusel.id;
                const btnPrev = document.querySelector(`.carousel-left[data-target="${target}"]`);
                if (btnPrev && cards.length > 1) {
                    btnPrev.click();
                    cardIndex = 0;
                }
            }
            break;
        

        case 'ArrowDown':
            e.preventDefault();
            if (enBuscador) {
                enBuscador = false;
                carruselIndex = 0;
                cardIndex = 0;
            } else {
                carruselIndex = (carruselIndex + 1) % carruseles.length;
                cardIndex = 0;
            }
            break;

        case 'ArrowUp':
            e.preventDefault();
            if (carruselIndex === 0) {
                enBuscador = true;
                carruselIndex = -1;
            } else {
                carruselIndex--;
                cardIndex = 0;
            }
            break;

        case 'Enter':
            e.preventDefault();
            activarCard();
            break;

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

window.addEventListener('DOMContentLoaded', () => {
    actualizarCarruseles();
    actualizarFoco();

    document.addEventListener('keydown', handleKeydown);

    document.addEventListener('click', (e) => {
        const isCard = e.target.closest('.video-card, .series-card, .channel-card, .episode-card');
        if (!isCard) actualizarFoco();
    });
});
