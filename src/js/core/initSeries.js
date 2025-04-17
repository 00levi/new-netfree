import { loadSeries } from './loadSeries.js';
import { renderSeries } from './renderSeries.js';
import { updateCarouselButtons } from '../components/carousel.js';
import { renderEpisodes } from './renderEpisodes.js';  // Importar la función de renderizado de episodios

const jsonSeriesUrl = 'https://raw.githubusercontent.com/00levi/lista/main/series.json';
const ITEMS_PER_PAGE = 5;

let series = [];
let seriesIndex = 0;
let currentSeries = null;
let currentEpisodes = [];
let episodeIndex = 0;

const seriesGrid = document.getElementById('seriesGrid');
const episodesGrid = document.getElementById('episodesGrid');
const searchInput = document.getElementById('searchInput');

// Función para cargar las series
function setSeries(data) {
    series = data;
}

// Función para manejar el índice de las series
function setSeriesIndex(index) {
    seriesIndex = index;
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// Función para cargar las series filtradas y mostrarlas
function renderFilteredSeries() {
    const searchTerm = normalizeText(searchInput.value);
    const filteredSeries = series.filter(serie => normalizeText(serie.title).includes(searchTerm));

    renderSeries(
        filteredSeries,
        seriesIndex,
        searchTerm,
        ITEMS_PER_PAGE,
        seriesGrid,
        (serie) => {
            currentSeries = serie;
            currentEpisodes = serie.episodes || [];
            episodeIndex = 0;
            renderEpisodes(episodesGrid, currentEpisodes, episodeIndex, ITEMS_PER_PAGE);
            updateCarouselButtons('episodes', [], [], currentEpisodes, 0, 0, episodeIndex, ITEMS_PER_PAGE);
            episodesGrid.closest('.carousel-wrapper').style.display = currentEpisodes.length ? 'block' : 'none';
        }
    );

    if (!filteredSeries.length) {
        episodesGrid.closest('.carousel-wrapper').style.display = 'none';
    }

    updateCarouselButtons('series', [], filteredSeries, [], 0, seriesIndex, 0, ITEMS_PER_PAGE);
}


// Manejar el cambio de páginas de series
document.querySelector('.carousel-left[data-target="seriesCarousel"]').addEventListener('click', () => {
    seriesIndex = Math.max(0, seriesIndex - ITEMS_PER_PAGE);
    renderFilteredSeries();
});

document.querySelector('.carousel-right[data-target="seriesCarousel"]').addEventListener('click', () => {
    seriesIndex = Math.min(series.length - ITEMS_PER_PAGE, seriesIndex + ITEMS_PER_PAGE);
    renderFilteredSeries();
});

// Navegación de episodios
document.querySelector('.carousel-left[data-target="episodesCarousel"]').addEventListener('click', () => {
    episodeIndex = Math.max(0, episodeIndex - ITEMS_PER_PAGE);
    renderEpisodes(episodesGrid, currentEpisodes, episodeIndex, ITEMS_PER_PAGE);
});

document.querySelector('.carousel-right[data-target="episodesCarousel"]').addEventListener('click', () => {
    episodeIndex = Math.min(currentEpisodes.length - ITEMS_PER_PAGE, episodeIndex + ITEMS_PER_PAGE);
    renderEpisodes(episodesGrid, currentEpisodes, episodeIndex, ITEMS_PER_PAGE);
});

// Filtro de búsqueda de series
searchInput.addEventListener('input', renderFilteredSeries);

// Carga inicial de las series
loadSeries(jsonSeriesUrl, setSeries, setSeriesIndex, renderFilteredSeries);


