export function loadMovies(jsonMoviesUrl, setMovies, setMovieIndex, renderMovies) {
    fetch(jsonMoviesUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de películas cargados:', data);
            setMovies(data);
            setMovieIndex(0);
            renderMovies();
        })
        .catch(error => console.error('Error al cargar las películas:', error));
}
