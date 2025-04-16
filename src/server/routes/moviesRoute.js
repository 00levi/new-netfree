const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/movies.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../movies.json'));
});

module.exports = router;
