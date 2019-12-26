const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

// const User = require('../models/userSchema');
// const Potluck = require('../models/potluckSchema');

mongoose.connect('mongodb://localhost/soloProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get('/', (req, res) => {

    res.render('index');
});



module.exports = router;
