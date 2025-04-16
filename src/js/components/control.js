// src/js/components/control.js

export async function checkControlFile() {
    try {
        const response = await fetch('http://192.168.0.8:3000/control.json');
        const controlData = await response.json();

        // Verifica si se debe apagar
        if (controlData.apagado === true) {
            console.log("Solicitando apagado de la computadora...");
            if (window.electronAPI?.shutdownComputer) {
                await window.electronAPI.shutdownComputer(); // Solicita el apagado al backend
            } else {
                console.error("Función de apagado no disponible.");
            }
            return;
        }

        // Cambiar iframe si corresponde
        if (controlData.iframe && !controlData.clear) {
            const videoPlayer = document.getElementById('videoIframe');
            if (videoPlayer.src !== controlData.iframe) {
                videoPlayer.src = controlData.iframe;
                openModal(controlData.iframe);
                if (controlData.play === true) {
                    setTimeout(simulateClick, 1000);
                }
                await cleanControlFile(); // Limpia después de aplicar cambios
            }
        }
    } catch (error) {
        console.error('Error al leer el control.json:', error);
    }
}

// Limpia el archivo de control en el servidor
export async function cleanControlFile() {
    try {
        const response = await fetch('http://192.168.0.8:3000/control.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clear: true })
        });

        if (response.ok) {
            console.log('El control.json ha sido limpiado.');
        } else {
            console.error('Error al limpiar el control.json.');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud de limpieza:', error);
    }
}
