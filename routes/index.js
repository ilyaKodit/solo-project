const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

router.get('/', (req, res) => {

    res.redirect('/payment');
});

module.exports = router;
