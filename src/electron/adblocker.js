const { session } = require('electron');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');

async function setupAdblocker() {
  const blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
  blocker.enableBlockingInSession(session.defaultSession);
  console.log('Bloqueador de anuncios activado');
}

module.exports = { setupAdblocker };
