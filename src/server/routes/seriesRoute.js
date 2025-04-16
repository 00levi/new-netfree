const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/series.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../series.json'));
});

module.exports = router;
