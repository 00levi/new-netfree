import { openModal } from '../components/modal.js';
import { updateCarouselButtons } from '../components/carousel.js';

export function renderMovies(movies, movieIndex, searchTerm, ITEMS_PER_PAGE, moviesGrid) {
    moviesGrid.innerHTML = '';
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    const movieSlice = filteredMovies.slice(movieIndex, movieIndex + ITEMS_PER_PAGE);
    movieSlice.forEach(movie => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.setAttribute('tabindex', '0');
        
        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('video-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = movieSlice.indexOf(movie);
            if (movie.video) {
                openModal({ type: 'video', src: movie.video, list: movieSlice, currentIndex: index });
            } else if (movie.iframe) {
                openModal({ type: 'iframe', src: movie.iframe });
            } else {
                console.warn('Película sin fuente:', movie);
            }
        });

        const img = document.createElement('img');
        img.src = movie.image;
        img.alt = movie.title;

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links-container');

        const movieTitle = document.createElement('div');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('video-title');
        linksContainer.appendChild(movieTitle);

        link.appendChild(img);
        link.appendChild(linksContainer);
        videoCard.appendChild(link);
        moviesGrid.appendChild(videoCard);

        videoCard.addEventListener('mouseover', () => {
            videoCard.classList.add('expanded');
            linksContainer.style.display = 'block';
        });

        videoCard.addEventListener('mouseout', () => {
            videoCard.classList.remove('expanded');
            linksContainer.style.display = 'none';
        });
    });
    updateCarouselButtons('movies');
}
