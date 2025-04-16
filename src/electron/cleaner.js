const { session } = require('electron');

function clearSessionData() {
  const currentSession = session.defaultSession;

  currentSession.clearStorageData({ storages: ['cookies'] })
    .then(() => console.log('Cookies limpiadas al iniciar la aplicación'))
    .catch(err => console.error('Error al limpiar cookies:', err));

  currentSession.clearCache()
    .then(() => console.log('Caché limpiado al iniciar la aplicación'))
    .catch(err => console.error('Error al limpiar caché:', err));
}

module.exports = { clearSessionData };

