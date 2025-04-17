// src/js/core/loadChannels.js
export function loadChannels(jsonChannelsUrl, setChannels, setChannelIndex, renderChannels) {
    fetch(jsonChannelsUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de canales cargados:', data);
            setChannels(data);
            setChannelIndex(0);
            renderChannels();
        })
        .catch(error => console.error('Error al cargar los canales:', error));
}
