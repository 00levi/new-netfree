export function openModal({ type, src, introStart = null, introEnd = null }) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    const video = document.getElementById('videoPlayer');
    const skipButton = document.getElementById('skipIntro');

    modal.style.display = 'flex';

    if (type === 'video') {
        iframe.style.display = 'none';
        iframe.src = '';

        video.style.display = 'block';
        video.src = src;
        video.load();
        video.play();

        // 🧠 Ocultar botón al principio
        if (skipButton) skipButton.style.display = 'none';

        // 📌 Evento para controlar cuándo mostrar el botón de "Saltar Intro"
        const timeUpdateHandler = () => {
            if (
                introStart !== null &&
                introEnd !== null &&
                video.currentTime >= introStart &&
                video.currentTime < introEnd
            ) {
                skipButton.style.display = 'block';
            } else {
                skipButton.style.display = 'none';
            }
        };

        // 🧼 Limpiar eventos previos por si se abre otro modal
        video.removeEventListener('timeupdate', timeUpdateHandler);
        video.addEventListener('timeupdate', timeUpdateHandler);

        // ⚡ Acción al hacer click en "Saltar Intro"
        if (skipButton) {
            skipButton.onclick = () => {
                video.currentTime = introEnd;
                skipButton.style.display = 'none';
            };
        }

    } else if (type === 'iframe') {
        video.pause();
        video.src = '';
        video.style.display = 'none';

        iframe.style.display = 'block';
        iframe.src = src;

        if (skipButton) skipButton.style.display = 'none';
    } else {
        console.warn('Tipo de contenido desconocido:', type);
    }
}


function closeModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    const video = document.getElementById('videoPlayer');

    if (modal) modal.style.display = 'none';

    if (iframe) {
        iframe.src = '';
        iframe.style.display = 'none';
    }

    if (video) {
        video.pause();
        video.src = '';
        video.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeModal');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
