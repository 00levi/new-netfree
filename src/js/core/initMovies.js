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

function renderFilteredMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    renderMovies(
        movies,
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
        }
    );
    updateCarouselButtons('movies', movies, [], [], movieIndex, 0, 0, ITEMS_PER_PAGE);
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
