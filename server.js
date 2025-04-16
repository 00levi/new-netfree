const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./src/server/corsOptions');
const moviesRoute = require('./src/server/routes/moviesRoute');
const seriesRoute = require('./src/server/routes/seriesRoute');
const controlRoute = require('./src/server/routes/controlRoute');

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Rutas
app.use(moviesRoute);
app.use(seriesRoute);
app.use(controlRoute);

app.listen(3000, () => {
    console.log('Servidor escuchando en http://192.168.0.8:3000');
});
