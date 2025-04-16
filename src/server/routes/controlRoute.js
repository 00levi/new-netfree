const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/control.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../control.json'));
});

router.post('/clean-control', (req, res) => {
    const controlPath = path.join(__dirname, '../../../control.json');
    fs.writeFile(controlPath, JSON.stringify({ clear: true }, null, 2), err => {
        if (err) {
            console.error('Error al limpiar control.json:', err);
            return res.status(500).send('Error al limpiar el archivo.');
        }
        res.send('control.json ha sido limpiado.');
    });
});

module.exports = router;
