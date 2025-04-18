// src/js/core/initChannels.js
import { loadChannels } from './loadChannels.js';
import { renderChannels } from './renderChannels.js';

const jsonChannelsUrl = 'https://raw.githubusercontent.com/00levi/lista/refs/heads/main/channel.json';
const ITEMS_PER_PAGE = 5;

let channels = [];
let channelIndex = 0;

const channelsGrid = document.getElementById('channelsGrid');
const searchInput = document.getElementById('searchInput');

function setChannels(data) {
    channels = data;
}

function setChannelIndex(index) {
    channelIndex = index;
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function renderFilteredChannels() {
    const searchTerm = normalizeText(searchInput.value);
    const filteredChannels = channels.filter(channel => normalizeText(channel.title).includes(searchTerm));

    renderChannels(
        filteredChannels,
        channelIndex,
        searchTerm,
        ITEMS_PER_PAGE,
        channelsGrid
    );

    // Activar navegación por teclado
    const carruseles = document.querySelectorAll('.carousel');
    carruseles.forEach(c => c.classList.remove('active'));

    const channelsCarrusel = document.getElementById('channelsGrid')?.closest('.carousel');
    if (channelsCarrusel) {
        channelsCarrusel.classList.add('active');
        const firstCard = channelsCarrusel.querySelector('.card');
        if (firstCard) {
            document.querySelectorAll('.card.selected').forEach(card => card.classList.remove('selected'));
            firstCard.classList.add('selected');
        }
    }

    
}


searchInput.addEventListener('input', renderFilteredChannels);

document.querySelector('.carousel-left[data-target="channelsCarousel"]').addEventListener('click', () => {
    channelIndex = Math.max(0, channelIndex - ITEMS_PER_PAGE);
    renderFilteredChannels();
});

document.querySelector('.carousel-right[data-target="channelsCarousel"]').addEventListener('click', () => {
    channelIndex = Math.min(channels.length - ITEMS_PER_PAGE, channelIndex + ITEMS_PER_PAGE);
    renderFilteredChannels();
});

loadChannels(jsonChannelsUrl, setChannels, setChannelIndex, renderFilteredChannels);


