export function openModal(src) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    iframe.src = src;
    modal.style.display = 'flex';
}


// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'none';
    const iframe = document.getElementById('videoIframe');
    iframe.src = ''; // Limpiar el src para detener el video
}

//cerrar el modal segun el id en el html o la tecla esc
document.getElementById('closeModal').addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

export function simulateClick() {
    const scriptPath = path.join(__dirname, 'simulate_click.ahk');
    
    exec(`start "" "${scriptPath}"`, (error) => {
        if (error) {
            console.error(`Error al ejecutar el script de AutoHotkey: ${error}`);
        } else {
            console.log('Clic simulado en el centro de la pantalla.');
        }
    });
}
