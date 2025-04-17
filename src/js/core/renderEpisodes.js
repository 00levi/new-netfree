import { openModal } from '../components/modal.js';

export function renderEpisodes(episodesGrid, currentEpisodes, episodeIndex, ITEMS_PER_PAGE) {
    episodesGrid.innerHTML = ''; // Limpiar el grid de episodios
    const episodeSlice = currentEpisodes.slice(episodeIndex, episodeIndex + ITEMS_PER_PAGE);
    episodeSlice.forEach(episode => {
        const episodeCard = document.createElement('div');
        episodeCard.classList.add('episode-card');
        episodeCard.setAttribute('tabindex', '0');

        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('episode-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(episode.iframe); // Suponiendo que tienes una función openModal para mostrar el video
        });

        const img = document.createElement('img');
        img.src = episode.image;
        img.alt = episode.episodeTitle;

        const episodeTitle = document.createElement('div');
        episodeTitle.textContent = episode.episodeTitle;
        episodeTitle.classList.add('episode-title');

        link.appendChild(img);
        link.appendChild(episodeTitle);
        episodeCard.appendChild(link);
        episodesGrid.appendChild(episodeCard);
    });
}
