export function loadSeries(jsonSeriesUrl, setSeries, setSeriesIndex, renderSeries) {
    fetch(jsonSeriesUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de series cargados:', data);
            setSeries(data);
            setSeriesIndex(0);
            renderSeries();
        })
        .catch(error => console.error('Error al cargar las series:', error));
}
