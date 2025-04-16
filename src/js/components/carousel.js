export function updateCarouselButtons(type, movies, series, currentEpisodes, movieIndex, seriesIndex, episodeIndex, ITEMS_PER_PAGE) {
    const carousel = document.getElementById(`${type}Carousel`);
    if (!carousel) return;

    const leftButton = carousel.querySelector('.carousel-left');
    const rightButton = carousel.querySelector('.carousel-right');

    if (type === 'movies') {
        leftButton.disabled = movieIndex === 0;
        rightButton.disabled = movieIndex + ITEMS_PER_PAGE >= (movies?.length || 0);
    } else if (type === 'series') {
        leftButton.disabled = seriesIndex === 0;
        rightButton.disabled = seriesIndex + ITEMS_PER_PAGE >= (series?.length || 0);
    } else if (type === 'episodes') {
        leftButton.disabled = episodeIndex === 0;
        rightButton.disabled = episodeIndex + ITEMS_PER_PAGE >= (currentEpisodes?.length || 0);
    }
}
