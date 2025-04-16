const { getWindow } = require('./window');

let currentMovie;

function playMovie(movieUrl) {
  const win = getWindow();
  if (!win) return;

  if (currentMovie) {
    win.webContents.send('close-movie', currentMovie);
  }

  currentMovie = movieUrl;
  win.webContents.send('play-movie', movieUrl);
}

module.exports = { playMovie };
