import { loadMovies } from './loadMovies.js';
import { renderMovies } from './renderMovies.js';
import { renderEpisodes } from './renderEpisodes.js';
import { updateCarouselButtons } from '../components/carousel.js';

const jsonMoviesUrl = 'https://raw.githubusercontent.com/00levi/lista/main/movies.json';
const ITEMS_PER_PAGE = 5;

let movies = [];
let movieIndex = 0;
let currentMovie = null;
let currentEpisodes = [];
let episodeIndex = 0;

const moviesGrid = document.getElementById('moviesGrid');
const episodesGrid = document.getElementById('episodesGrid');
const searchInput = document.getElementById('searchInput');

function setMovies(data) {
    movies = data;
}

function setMovieIndex(index) {
    movieIndex = index;
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function renderFilteredMovies() {
    const searchTerm = normalizeText(searchInput.value);
    const filteredMovies = movies.filter(movie => normalizeText(movie.title).includes(searchTerm));

    renderMovies(
        filteredMovies,
        movieIndex,
        searchTerm,
        ITEMS_PER_PAGE,
        moviesGrid,
        (movie) => {
            currentMovie = movie;
            currentEpisodes = movie.episodes || [];
            episodeIndex = 0;
            renderEpisodes(currentMovie, currentEpisodes, episodeIndex, ITEMS_PER_PAGE, episodesGrid);
            updateCarouselButtons('episodes', [], [], currentEpisodes, 0, 0, episodeIndex, ITEMS_PER_PAGE);
            episodesGrid.closest('.carousel-wrapper').style.display = currentEpisodes.length ? 'block' : 'none';
        }
    );

    if (!filteredMovies.length) {
        episodesGrid.closest('.carousel-wrapper').style.display = 'none';
    }

    updateCarouselButtons('movies', filteredMovies, [], [], movieIndex, 0, 0, ITEMS_PER_PAGE);

    // Activar navegación por teclado
    const carruseles = document.querySelectorAll('.carousel');
    carruseles.forEach(c => c.classList.remove('active'));

    const moviesCarrusel = document.getElementById('moviesGrid')?.closest('.carousel');
    if (moviesCarrusel) {
        moviesCarrusel.classList.add('active');
        const firstCard = moviesCarrusel.querySelector('.card');
        if (firstCard) {
            document.querySelectorAll('.card.selected').forEach(card => card.classList.remove('selected'));
            firstCard.classList.add('selected');
            
        }
    }

}



searchInput.addEventListener('input', renderFilteredMovies);

// Botones del carrusel de películas
document.querySelector('.carousel-left[data-target="moviesCarousel"]').addEventListener('click', () => {
    movieIndex = Math.max(0, movieIndex - ITEMS_PER_PAGE);
    renderFilteredMovies();
});

document.querySelector('.carousel-right[data-target="moviesCarousel"]').addEventListener('click', () => {
    movieIndex = Math.min(movies.length - ITEMS_PER_PAGE, movieIndex + ITEMS_PER_PAGE);
    renderFilteredMovies();
});

loadMovies(jsonMoviesUrl, setMovies, setMovieIndex, renderFilteredMovies);
