const { loadAllowedOrigins } = require('./loadOrigins');

const allowedOrigins = loadAllowedOrigins();

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

module.exports = { corsOptions };
