// src/electron/power.js
const { exec } = require('child_process');

function shutdownComputer() {
  const command = process.platform === 'win32'
    ? 'shutdown /s /t 0'
    : (process.platform === 'linux' ? 'shutdown now' : 'shutdown -h now');

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al intentar apagar: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Apagado ejecutado: ${stdout}`);
  });
}

module.exports = { shutdownComputer };
