// src/js/renderSeries.js

export function renderSeries(series, seriesIndex, searchTerm, ITEMS_PER_PAGE, seriesGrid, onSeriesClick) {
    seriesGrid.innerHTML = ''; // Limpiar el grid de series

    // Filtrar las series por el término de búsqueda
    const filteredSeries = series.filter(serie => serie.title.toLowerCase().includes(searchTerm));
    const seriesSlice = filteredSeries.slice(seriesIndex, seriesIndex + ITEMS_PER_PAGE);

    seriesSlice.forEach(serie => {
        const seriesCard = document.createElement('div');
        seriesCard.classList.add('series-card');
        seriesCard.setAttribute('tabindex', '0');

        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('series-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            onSeriesClick(serie); 
        });

        const img = document.createElement('img');
        img.src = serie.image;
        img.alt = serie.title;

        const seriesTitle = document.createElement('div');
        seriesTitle.textContent = serie.title;
        seriesTitle.classList.add('series-title');

        link.appendChild(img);
        link.appendChild(seriesTitle);
        seriesCard.appendChild(link);
        seriesGrid.appendChild(seriesCard);

        // Agregar interacciones visuales
        seriesCard.addEventListener('mouseover', () => {
            seriesCard.classList.add('expanded');
        });

        seriesCard.addEventListener('mouseout', () => {
            seriesCard.classList.remove('expanded');
        });
    });
}
