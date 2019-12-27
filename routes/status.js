const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('status');
});

router.post('/:id', (req, res) => {

    res.render('statusResult', {
        layout: false,
        total: req.body.total
    });
});

module.exports = router;
